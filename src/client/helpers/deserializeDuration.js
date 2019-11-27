const deserializeDuration = duration => {
  const minutes = Math.floor(duration / 60)
  let seconds = duration % 60
  if (seconds <= 9) seconds = `0${seconds}`
  return `${minutes}:${seconds}`
}

export default deserializeDuration
