function numberEnding(number: number): string {
  return number > 1 ? "s" : "";
}

export function humanFormatDuration(durationSeconds: number): string {
  let output = "";

  let integerDurationSeconds = Math.floor(durationSeconds);
  const years = Math.floor(integerDurationSeconds / 31536000); // 365 * 24 * 3600
  if (years) {
    output += years + " year" + numberEnding(years);
  }

  const days = Math.floor((integerDurationSeconds %= 31536000) / 86400);
  if (days) {
    output += " " + days + " day" + numberEnding(days);
  }

  const hours = Math.floor((integerDurationSeconds %= 86400) / 3600);
  if (hours) {
    output += " " + hours + " hour" + numberEnding(hours);
  }

  const minutes = Math.floor((integerDurationSeconds %= 3600) / 60);
  if (minutes) {
    output += " " + minutes + " min" + numberEnding(minutes);
  }

  const seconds = integerDurationSeconds % 60;
  if (seconds) {
    output += " " + seconds + " sec" + numberEnding(seconds);
  }

  if (!output) {
    output = "< 1 sec";
  }

  return output;
}

export function integerToIpaddress(integerIp: number): string | null {
  if (integerIp < 0 || integerIp > 0xffffffff) return null;

  const octet1 = (integerIp >>> 24) & 0xff;
  const octet2 = (integerIp >>> 16) & 0xff;
  const octet3 = (integerIp >>> 8) & 0xff;
  const octet4 = integerIp & 0xff;

  return `${octet1}.${octet2}.${octet3}.${octet4}`;
}

export function getResultColor(
  result:
    | string
    | "PASS"
    | "FAIL"
    | "SKIP"
    | "XPASS"
    | "XFAIL"
    | "ERROR"
    | "ABORT",
): string {
  switch (result) {
    case "PASS":
      return "#52c41a";
    case "FAIL":
      return "#f5222d";
    case "ERROR":
      return "#ff4d4f";
    case "XPASS":
      return "#faad14";
    case "XFAIL":
      return "#13c2c2";
    case "ABORT":
      return "#eb2f96";
    default:
      return "#bfbfbf";
  }
}
