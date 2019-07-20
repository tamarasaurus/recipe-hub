export default function (quantityString: string) {
  if (quantityString.trim().length === 0) {
    this.value = null;
    return;
  }

  this.value = parseFloat(quantityString.replace(/\(|\)/gm, '').match(/\d+/gm)[0]);
}
