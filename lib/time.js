export function secondsToMinutes (s) {
  var minutes = Math.floor(s / 60)
  var seconds = Math.floor(s % 60)
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return minutes + ':' + seconds
}
