export function startTime(
  start: number,
  duration: number,
  maxVal: number,
  durationFormat?: 'round' | 'clockStandard' | 'decimal'
) {
  'worklet'
  let startPercen = start / maxVal
  if (durationFormat === 'clockStandard') {
    return ((duration * startPercen) / 60).toFixed(2)
  } else if (durationFormat === 'round') {
    return Math.round(duration * startPercen)
  } else if (durationFormat === 'decimal') {
    return (duration * startPercen).toFixed(2)
  } else {
    return ((duration * startPercen) / 60).toFixed(2)
  }
}

export function endTime(
  end: number,
  duration: number,
  maxVal: number,
  durationFormat?: 'round' | 'clockStandard' | 'decimal'
) {
  'worklet'
  let endPercen = (maxVal + end) / maxVal
  if (durationFormat === 'clockStandard') {
    return ((duration * endPercen) / 60).toFixed(2)
  } else if (durationFormat === 'round') {
    return Math.round(duration * endPercen)
  } else if (durationFormat === 'decimal') {
    return (duration * endPercen).toFixed(2)
  } else {
    return ((duration * endPercen) / 60).toFixed(2)
  }
}
