import { isEmpty, last, concat } from "lodash"

const determineDiscs = songs => {
  if (isEmpty(songs)) return []
  const numOfDiscs = last(songs).discNumber
  const init = new Array(numOfDiscs)
  const discs = init.fill([])
  return discs.map(
    (disc, index) => ({
      number: index + 1,
      songs: concat(
        disc,
        songs.filter(
          ({ discNumber }) => discNumber === index + 1,
        ),
      ),
    }),
  )
}

export default determineDiscs
