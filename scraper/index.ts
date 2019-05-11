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
    })
    done(null, mappedItems);
  }).catch((e: Error) => {
    done(e, []);
  });
});

scrapingQueue.on('completed', (job: any, result) => {
  console.log('complete', job.data.url);
}).on('error', (error: Error) => {
  console.log('error', error);
});

const contracts = {
  quitoque: {
    indexContract: require('./contracts/quitoque-index.json'),
    index: 'https://www.quitoque.fr/au-menu/2_personnes',
    recipeContract: require('./contracts/quitoque.json'),
  },
};

function collectLinks(url: string, contract: any) {
  const scraper = new Scraper(url, contract);
  console.log(url);

  return scraper.scrapePage().then((results: any[]) => {
    return results.map(result => result.link).filter(link => link !== null);
  });
}

async function scrapeRecipes() {
  const linkPromises = [
    collectLinks(contracts.quitoque.index, contracts.quitoque.indexContract)
  ];

  const links = [];

  for (const promise of linkPromises) {
    const resolvedLinks = await promise;
    links.push(...resolvedLinks);
  }

  const cleanedLinks = Array.from(new Set(links));

  cleanedLinks.forEach((url: string) => scrapingQueue.add({
    url, contract: contracts.quitoque.recipeContract,
    name: url,
  }));
}

scrapeRecipes();
