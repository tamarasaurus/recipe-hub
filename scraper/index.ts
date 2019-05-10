import Scraper from 'contract-scraper';
import csv from './attributes/csv';
import ingredientList from './attributes/ingredient-list';
import duration from './attributes/duration';
import * as moment from 'moment';
import * as flatten from 'array-flatten';
import * as Queue from 'bull';

const scrapingQueue = new Queue('scraping', 'redis://127.0.0.1:6379');

scrapingQueue.process((job: any, done) => {

  const scraper = new Scraper(job.url, job.contract, {
    'csv': csv,
    'ingredient-list': ingredientList,
    'duration': duration,
  })

  console.log(job.url);

  scraper.scrapePage().then(items => {
    console.log('scraped items', items)
    done(null, items)
  }).catch((e: Error) => {
    done(e, [])
  });
});

scrapingQueue.on('completed', (job: any, result) => {
  console.log(job.url, result)
})

const weeks = [
  moment().add(1, 'week').startOf('isoWeek').format('YYYY-MM-DD'),
  moment().add(2, 'week').startOf('isoWeek').format('YYYY-MM-DD'),
  moment().add(3, 'week').startOf('isoWeek').format('YYYY-MM-DD')
]

const contracts = {
  quitoque: {
    links: require('./contracts/quitoque-link.json'),
    recipes: require('./contracts/quitoque.json'),
    urls: [
      `https://www.quitoque.fr/au-menu/2_personnes/${weeks[0]}`,
      `https://www.quitoque.fr/au-menu/2_personnes/${weeks[1]}`,
      `https://www.quitoque.fr/au-menu/2_personnes/${weeks[2]}`,
    ]
  }
}

function collectLinks(url: string, contract) {
  const scraper = new Scraper(url, contract);
  return scraper.scrapePage();
}

async function scrapeRecipes() {
  const linkPromises = contracts.quitoque.urls.map((url: string) => {
    return collectLinks(url, contracts.quitoque.links)
  });

  const links = await Promise.all(linkPromises).then((...values) => {
    return flatten(values).map((url: any) => url.link).filter((url: string) => url !== null);
  })

  links.forEach((url: string) => scrapingQueue.add({
    url, contract: contracts.quitoque.recipes
  }))
}

scrapeRecipes();
