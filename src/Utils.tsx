export function convertTime(time:string) {
    const split = time.split(":");
    const zone = parseFloat(split[0]) > 12 ? "PM" : "AM";
    const hour = ((parseFloat(split[0]) % 12) || 12);
    return hour+":"+split[1]+" "+zone;
}
