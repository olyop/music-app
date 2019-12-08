import { toString } from "lodash"

const deserializeDate = unixTimeStamp => {
  const date = new Date(unixTimeStamp * 86400 * 1000)
  const year = toString(date.getFullYear())
  let day = date.getDate()
  let month = date.getMonth() + 1
  if (day <= 9) day = toString(`0${day}`)
  if (month <= 9) month = toString(`0${month}`)
  return [day, month, year].join("/")
}

export default deserializeDate
