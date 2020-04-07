import orderBy from "lodash/orderBy.js"

const reduceToFormat = plays => {
  let temp = []
  for (const play of plays) {
    const index = temp.findIndex(obj => obj.song === play.song)
    if (index === -1) {
      temp.push({ song: play.song, plays: 1 })
    } else {
      temp[index].plays++
    }
  }
  return temp
}

const determineTopTen = plays => {
  const topTenIdsAndPlays = reduceToFormat(plays)
  return orderBy(topTenIdsAndPlays, "plays", "asc").map(({ song }) => song)
}

export default determineTopTen
