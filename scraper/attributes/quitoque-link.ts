import * as path from 'path';

export default class Link  {
  private inputValue: [string, string] = null;

  public constructor(link: string, root: string) {
    this.inputValue = [link, root];
  }

  public get value(): string {
    const [link, root] = this.inputValue;
    return this.normalize([link, root]);
  }

  public normalize([link, root]: [string, string]): string {
    if (link === undefined || link === null || link.trim().length === 0) {
      return null;
    }

    const date = link.split('/')[3];
    let trimmedLink = link;

    if (typeof date !== undefined) {
      trimmedLink = trimmedLink.replace(`/${date}`, '');
    }

    const url = new URL(root);

    return `${url.protocol}//${path.join(url.host, trimmedLink)}`;
  }
}