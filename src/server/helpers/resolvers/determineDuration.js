import toInteger from "lodash/toInteger.js"

const determineDuration = duration => {
  const minutes = toInteger(duration.slice(0,1))
  const seconds = toInteger(duration.slice(2,4))
  return (minutes * 60) + seconds
}

export default determineDuration
