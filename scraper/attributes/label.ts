export default function (labelString: string) {
  const textLabel = labelString.replace(/\n/gm, '').replace(/x\s+/gm, '');
  this.value = textLabel.trim();
}
