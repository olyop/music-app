const deserializeDuration = duration => {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes}:${seconds <= 9 ? "0" : ""}${seconds}`
}

export default deserializeDuration
