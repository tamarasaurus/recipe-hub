import * as Queue from 'bull';
import * as request from 'request-promise';

// Scraper jobs
import Scraper from 'contract-scraper';
import scrapeJob from './jobs/scrape';
import storeJob from './jobs/store';

// HTML contracts
import * as lesCommisIndex from './contracts/lescommis-index.json';
import * as lesCommisRecipe from './contracts/lescommis.json';
import * as hellofreshIndex from './contracts/hellofresh-index.json';
import * as hellofreshRecipe from './contracts/hellofresh.json';
import * as quitoqueIndex from './contracts/quitoque-index.json';
import * as quitoqueRecipe from './contracts/quitoque.json';

// JSON parsers
import parseBonAppetit from './parsers/bon-appetit';

const scrapingQueue = new Queue('scraping', process.env.REDIS_URL);
const storageQueue = new Queue('storage', process.env.REDIS_URL);

scrapingQueue.process(scrapeJob);
storageQueue.process(storeJob);

scrapingQueue.on('completed', (job: any, scrapedRecipes: any[]) => {
  console.log('✓ scraped', job.data.url, '\n');
  scrapedRecipes.forEach((recipe: any) => storageQueue.add(recipe));
}).on('error', (error: Error) => console.log('error', error));

storageQueue.on('completed', (job: any) => console.log('✓ stored', job.data.url));

const html = [
  {
    index: 'https://lescommis.com/cookbook/recettes/',
    indexContract: lesCommisIndex,
    recipeContract: lesCommisRecipe,
  },
  {
    index: 'https://www.hellofresh.fr/recipes/search/?order=-date',
    indexContract: hellofreshIndex,
    recipeContract: hellofreshRecipe,
  },
  {
    index: 'https://www.quitoque.fr/au-menu/2_personnes',
    indexContract: quitoqueIndex,
    recipeContract: quitoqueRecipe,
  },
];

const json = [
  {
    parser: parseBonAppetit,
    itemProperty: 'items',
    url: 'https://www.bonappetit.com/api/search?content=recipe&meal=dinner&sort=newest&size=500',
  },
];

async function collectLinks(url: string, contract: any): Promise<string[]> {
  const scraper = new Scraper(url, contract);
  const links = await scraper.scrapePage();
  const cleanedLinks = links.map(link => link.link).filter(link => link !== null);
  return Array.from(new Set(cleanedLinks));
}

async function scrapeHTML() {
  for (const options of html) {
    const links = await collectLinks(options.index, options.indexContract);

    links.forEach((url: string) => {
      scrapingQueue.add({ url, contract: options.recipeContract, name: url });
    });
  }
}

async function scrapeJSON() {
  const parsedResults: any[] = [];

  for (const options of json) {
    const results = await request.get({ url: options.url, json: true });

    results[options.itemProperty].forEach((result: any) => {
      parsedResults.push(options.parser(result));
    });
  }

  parsedResults.forEach((recipe: any) => storageQueue.add(recipe));
}

scrapeHTML();
scrapeJSON();
