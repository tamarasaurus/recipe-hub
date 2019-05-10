export default function duration(rawTime) {
    const time = rawTime.trim()
    const hoursMatch = /(\d+)\shr/gm.exec(time);
    const minutesMatch = /(\d+)\smin/gm.exec(time);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    const seconds = (3600 * hours) + (60 * minutes);
    this.value = seconds;
}