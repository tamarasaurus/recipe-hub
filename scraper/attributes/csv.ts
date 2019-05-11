export default function (commaSeparatedString: string) {
  if (commaSeparatedString === null) return;

  this.value = commaSeparatedString
        .split(',')
        .map((item: string) => item.trim())
        .filter((item => item.length > 0));
}
