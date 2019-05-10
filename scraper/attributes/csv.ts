export default function (commaSeparatedString) {
    this.value = commaSeparatedString
        .split(',')
        .map((item: string) => item.trim())
        .filter((item => item.length > 0));
}
