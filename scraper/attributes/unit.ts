export default function (unitString: string) {
  if (unitString.trim().length === 0) {
    this.value = null;
    return;
  }

  this.value = unitString.replace(/\(|\)/gm, '').replace(/\d+/gm, '').trim();
}
