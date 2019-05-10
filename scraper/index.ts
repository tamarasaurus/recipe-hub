import Scraper from 'contract-scraper';

const sources = {
  quitoque: {
    links: [
      'https://www.quitoque.fr/recettes/poulet-label-rouge-roti-a-lorigan'
    ],
    contract: require('./contracts/quitoque.json')
  }
}

function collectPagesToScrape() {

}

function scrapePage(url: string, contract) {
  const scraper = new Scraper(url, contract, {
    list: function() {
      this.value = ''
    }
  })

  scraper.scrapePage().then(items => {
    console.log('scraped items', items)
  })
}

scrapePage(sources.quitoque.links[0], sources.quitoque.contract)
