export default class Shared {
  static multiDateFormat(d: string, m: string, y: string) {
    const newDate = y + '-' + Shared.minTwoDigits(m) + '-' + Shared.minTwoDigits(d);
    return newDate;
  }
  static minTwoDigits(n: string) {
   let val;
    if (n.toString().length === 1) {
      val = '0' + n;
    } else {
      val = n;
    }
    return val;
  }
}
