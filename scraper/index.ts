import * as Queue from 'bull';

// Scraper jobs
import Scraper from 'contract-scraper';
import scrapeJob from './jobs/scrape';
import storeJob from './jobs/store';

// HTML contracts
import * as lesCommisIndex from './contracts/lescommis-index.json';
import * as lesCommisRecipe from './contracts/lescommis.json';
import * as blueApronIndex from './contracts/blueapron-index.json';
import * as blueApronRecipe from './contracts/blueapron.json';
import * as quitoqueIndex from './contracts/quitoque-index.json';
import * as quitoqueRecipe from './contracts/quitoque.json';

// Attributes
import quitoqueLink from './attributes/quitoque-link';

const scrapingQueue = new Queue('scraping', process.env.REDIS_URL);
const storageQueue = new Queue('storage', process.env.REDIS_URL);

console.log('API_URL', process.env.API_URL);

scrapingQueue.process(scrapeJob);
storageQueue.process(storeJob);

scrapingQueue.on('completed', (job: any, scrapedRecipes: any[]) => {
  console.log('✓ scraped', job.data.url, '\n');
  scrapedRecipes.forEach((recipe: any) => {
    if (recipe.ingredients.length > 1) {
      storageQueue.add(recipe);
    }
    job.remove();
  });
}).on('error', (error: Error) => console.log('error', error));

storageQueue.on('completed', (job: any) => {
  console.log('✓ stored', job.data.url);
  job.remove();
}).on('failed', (job: any) => job.remove());

const html = [
  {
    index: 'https://www.quitoque.fr/au-menu/2_personnes',
    indexContract: quitoqueIndex,
    recipeContract: quitoqueRecipe,
    sourceName: 'Quitoque',
  },
  {
    index: 'https://lescommis.com/cookbook/recettes/',
    indexContract: lesCommisIndex,
    recipeContract: lesCommisRecipe,
    sourceName: 'Les Commis',
  },
  {
    index: 'https://www.blueapron.com/pages/sample-recipes',
    indexContract: blueApronIndex,
    recipeContract: blueApronRecipe,
    sourceName: 'Blue Apron',
  },
];

async function collectLinks(url: string, contract: any): Promise<string[]> {
  const scraper = new Scraper(url, contract, { quitoqueLink });
  try {
    const links = await scraper.scrapePage();
    const cleanedLinks = links.map(link => link.link).filter(link => link !== null);
    return Array.from(new Set(cleanedLinks));
  } catch (e) {
    return [];
  }
}

async function scrapeHTML() {
  for (const options of html) {
    const { index, indexContract, recipeContract, sourceName } = options;

    try {
      const links = await collectLinks(index, indexContract);
      links.forEach((url: string) => {
        scrapingQueue.add({
          sourceName,
          url,
          contract: recipeContract,
          name: url,
        });
      });
    } catch (e) {
      console.log('Error scraping', index, e.message);
    }
  }
}

scrapeHTML();
