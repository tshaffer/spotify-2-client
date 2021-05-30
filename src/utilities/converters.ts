export function getDuration(durationInMilliseconds: number): string {

  const durationInSeconds = durationInMilliseconds / 1000;

  const hours = Math.floor(durationInSeconds / 3600);

  const minutes = Math.floor((durationInSeconds - 3600 * hours) / 60);
  let minutesStr = minutes.toString();
  if (minutesStr.length === 1) {
    minutesStr = '0' + minutesStr;
  }

  const seconds = Math.floor(durationInSeconds - (3600000 * hours) - (60 * minutes));
  let secondsStr = seconds.toString();
  if (secondsStr.length === 1) {
    secondsStr = '0' + secondsStr;
  }

  let duration = '';
  if (hours > 0) {
    duration = hours + ':';
  }

  duration += minutesStr + ':' + secondsStr;
  return duration;
}

