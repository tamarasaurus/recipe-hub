import * as Queue from 'bull';
import Scraper, { PuppeteerFetcher } from 'contract-scraper';

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

function collectLinks(url: string, contract: any): Promise<string[]> {
  const scraper = new Scraper(url, contract);
  console.log(url);

  return scraper.scrapePage().then((results: any[]) => {
    return results.map(result => result.link).filter(link => link !== null);
  });
}

async function collectPaginatedLinks(url: string, contract: any): Promise<string[]> {
  // start a first page
  // go to next page
  // total / 6 offset of clicks
  const fetcher = new PuppeteerFetcher(url);
  const { page, browser } = await fetcher.setupBrowser();

  console.log('go to url', url)
  await page.goto(url);
  await page.waitFor(1000);

  const totalPageDescription = await page.$('[data-test-id="search-result"] + div span + [data-translation-id]')
  const totalPageNumber = await (await totalPageDescription.getProperty('previousSibling')).getProperty('innerText');
  const total = parseInt(await totalPageNumber.jsonValue());
  const offset = 6;
  const numberOfClicks = Math.round(total / offset);

  console.log('number of clicks', numberOfClicks);

  for (let i = 0; i < 5; i++) {
    try {
      const loadNextButton = await page.$(
        '[data-test-id="search-result"] + div button[data-kind="green"]',
      );
      await loadNextButton.click();
      await page.waitFor(500);
      console.log(i);
    } catch (e) {
      console.log('Error loading page', e);
    }
  }

  const result = await(await page.$('[data-test-id="search-result"] + div'));
  const linkElements = await (await result.$$('a[href]'));
  const links = [];

  for (const link of linkElements) {
    links.push(await (await link.getProperty('href')).jsonValue());
  }

  return links;
}

const contracts = {
  quitoque: {
    collectLinks,
    indexContract: require('./contracts/quitoque-index.json'),
    index: 'https://www.quitoque.fr/au-menu/2_personnes',
    recipeContract: require('./contracts/quitoque.json'),
  },
  hellofresh: {
    collectLinks: collectPaginatedLinks,
    indexContract: require('./contracts/hellofresh-index.json'),
    index: 'https://www.hellofresh.fr/recipes/search/?order=-date',
    recipeContract: require('./contracts/hellofresh.json'),
  },
};

async function scrapeRecipes() {
  const linkPromises = [
    contracts.hellofresh.collectLinks(contracts.hellofresh.index, contracts.hellofresh.indexContract),
    contracts.quitoque.collectLinks(contracts.quitoque.index, contracts.quitoque.indexContract),
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
