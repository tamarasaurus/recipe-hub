import Scraper from 'contract-scraper';

// Custom attributes
import csv from '../attributes/csv';
import duration from '../attributes/duration';
import quantity from '../attributes/quantity';
import label from '../attributes/label';
import unit from '../attributes/unit';
import blueapronLabel from '../attributes/blueapron-label';

export default function scrape(job: any, done: any) {
  const { url, contract, sourceName } = job.data;

  const scraper = new Scraper(url, contract, {
    csv,
    duration,
    quantity,
    label,
    unit,
    blueapronLabel,
  });

  scraper.scrapePage().then((items: any[]) => {
    const mappedItems = items.map((item: any) => {
      item.url = url;
      item.source = sourceName;

      return item;
    });

    done(null, mappedItems);
  }).catch((e: Error) => {
    console.log(e);
    done(e, []);
  });
}
