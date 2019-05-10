import Scraper from 'contract-scraper';
import csv from './attributes/csv';
import ingredientList from './attributes/ingredient-list';
import duration from './attributes/duration';

const sources = {
  quitoque: {
    links: [
      'https://www.quitoque.fr/recettes/poelee-de-saumon-aux-epices-nordiques/2019-20'
    ],
    contract: require('./contracts/quitoque.json')
  }
}

function collectPagesToScrape() {

}

function scrapePage(url: string, contract) {
  const scraper = new Scraper(url, contract, {
    'csv': csv,
    'ingredient-list': ingredientList,
    'duration': duration,
  })

  scraper.scrapePage().then(items => {
    console.log('scraped items', items)
  })
}

scrapePage(sources.quitoque.links[0], sources.quitoque.contract)
