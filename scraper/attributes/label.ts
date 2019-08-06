export default function (labelString: string) {
  const textLabel = labelString.replace(/\n/gm, '').replace(/.*\s?x\s+/gm, '');
  this.value = textLabel.trim();
}
