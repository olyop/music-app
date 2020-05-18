const deserializeDate = unixTimeStamp => {
  if (unixTimeStamp) {
    const date = new Date(unixTimeStamp * 86400 * 1000)
    const year = date.getFullYear()
    let day = date.getDate()
    let month = date.getMonth() + 1
    if (day <= 9) day = `0${day}`
    if (month <= 9) month = `0${month}`
    return [day, month, year].join("/")
  } else {
    return null
  }
}

export default deserializeDate
