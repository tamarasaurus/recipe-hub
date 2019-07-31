export default function (labelString: string) {
  if (labelString.trim().length === 0) {
    this.value = null;
    return;
  }

  const label = labelString.split(/\n/gm);
  this.value = label[label.length - 1];
  console.log(this.value);
}
