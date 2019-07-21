const numericQuantity = require('numeric-quantity');

export default function (quantityString: string) {
  if (quantityString.trim().length === 0) {
    this.value = null;
    return;
  }

  const quantity: string[] = quantityString.match(/\d+|[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞↉]/gm);
  this.value = quantity ? numericQuantity(quantity[0]) : null;
}
