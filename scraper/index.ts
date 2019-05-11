import * as Queue from 'bull';
import Scraper from 'contract-scraper';

// Custom attributes
import csv from './attributes/csv';
import duration from './attributes/duration';
import quantity from './attributes/quantity';
import label from './attributes/label';

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
  }).catch((e: Error) => {
    console.log('Error', e);
    done(e, []);
  });
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

const contracts = {
  hellofresh: {
    indexContract: require('./contracts/hellofresh-index.json'),
    index: 'https://www.hellofresh.fr/recipes/search/?order=-date',
    recipeContract: require('./contracts/hellofresh.json'),
  },
  quitoque: {
    indexContract: require('./contracts/quitoque-index.json'),
    index: 'https://www.quitoque.fr/au-menu/2_personnes',
    recipeContract: require('./contracts/quitoque.json'),
  },
};

async function scrapeRecipes() {
  const contractList = Object.entries(contracts);

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

scrapeRecipes();
