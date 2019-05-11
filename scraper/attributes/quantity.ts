export default function (quantityString: string) {
  if (quantityString.trim().length === 0) {
    this.value = null;
    return;
  }

  this.value = quantityString.replace(/\(|\)/gm, '');
}
