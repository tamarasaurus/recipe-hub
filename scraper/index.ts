import * as Queue from 'bull';
import Scraper from 'contract-scraper';
import * as request from 'request-promise';

// Custom attributes
import csv from './attributes/csv';
import duration from './attributes/duration';
import quantity from './attributes/quantity';
import label from './attributes/label';

// HTML contracts
import * as lesCommisIndex from './contracts/lescommis-index.json';
import * as lesCommisRecipe from './contracts/lescommis.json';
import * as hellofreshIndex from './contracts/hellofresh-index.json';
import * as hellofreshRecipe from './contracts/hellofresh.json';
import * as quitoqueIndex from './contracts/quitoque-index.json';
import * as quitoqueRecipe from './contracts/quitoque.json';

// JSON parsers
import parseBonAppetit from './parsers/bon-appetit';

const html = {
  lescommis: {
    index: 'https://lescommis.com/cookbook/recettes/',
    indexContract: lesCommisIndex,
    recipeContract: lesCommisRecipe,
  },
  hellofresh: {
    index: 'https://www.hellofresh.fr/recipes/search/?order=-date',
    indexContract: hellofreshIndex,
    recipeContract: hellofreshRecipe,
  },
  quitoque: {
    index: 'https://www.quitoque.fr/au-menu/2_personnes',
    indexContract: quitoqueIndex,
    recipeContract: quitoqueRecipe,
  },
};

const json = {
  bonappetit: {
    parser: parseBonAppetit,
    itemProperty: 'items',
    url: 'https://www.bonappetit.com/api/search?content=recipe&meal=dinner&sort=newest&size=2'
  },
};

const scrapingQueue = new Queue('scraping', process.env.REDIS_URL);

scrapingQueue.process((job: any, done) => {
  const { url, contract } = job.data;

  const scraper = new Scraper(url, contract, {
    csv,
    duration,
    quantity,
    label,
  });

  scraper.scrapePage().then((items: any[]) => {
    const mappedItems = items.map((item: any) => {
      item.url = url;
      return item;
    });

    done(null, mappedItems);
  }).catch((e: Error) => done(e, []));
});

scrapingQueue.on('completed', (job: any, result) => {
  console.log('complete', job.data.url);
}).on('error', (error: Error) => {
  console.log('error', error);
});

function collectLinks(url: string, contract: any): Promise<string[]> {
  const scraper = new Scraper(url, contract);

  return scraper.scrapePage().then((results: any[]) => {
    return results.map(result => result.link).filter(link => link !== null);
  });
}

async function scrapeHTMLPages() {
  const contractList = Object.entries(html);

  for (const [name, options] of contractList) {
    const links = await collectLinks(options.index, options.indexContract);
    const cleanedLinks = Array.from(new Set(links));

    cleanedLinks.forEach((url: string) => scrapingQueue.add({
      url,
      contract: options.recipeContract,
      name: url,
    }));
  }
}

async function scrapeJSONResults() {
  const parsedResults: any[] = [];

  for (const [name, options] of Object.entries(json)) {
    console.log(name, options);
    const results = await request.get({
      url: options.url,
      json: true,
    });

    results[options.itemProperty].forEach((result: any) => {
      parsedResults.push(options.parser(result));
    });
  }

  console.log(parsedResults);
}

// scrapeHTMLPages();

scrapeJSONResults();