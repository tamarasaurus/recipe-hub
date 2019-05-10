export default function (commaSeparatedString: string) {
  this.value = commaSeparatedString
        .split(',')
        .map((item: string) => item.trim())
        .filter((item => item.length > 0));
}
