import Scraper from 'contract-scraper';

// Custom attributes
import csv from '../attributes/csv';
import duration from '../attributes/duration';
import quantity from '../attributes/quantity';
import label from '../attributes/label';

export default function scrape(job: any, done: any) {
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
}
