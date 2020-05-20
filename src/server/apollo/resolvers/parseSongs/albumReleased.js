import fetch from "node-fetch"
import isNull from "lodash/isNull.js"

const parseHtml = res => res.text()

const albumReleased = ({ title, artists, released }) => new Promise(
  (resolve, reject) => {
    const query = `${title} ${artists.join(" ")} release date`
    const params = new URLSearchParams({ q: query })
    const url = `https://www.google.com/search?${params}`
    fetch(url)
      .then(parseHtml)
      .then(html => {
        /* eslint-disable-next-line max-len */
        const reg = /(0[1-9]|[12]\d|3[01]) (January|February|March|April|May|June|July|August|September|October|November|December) (?:19[7-9]\d|2\d{3})(?=\D|$)/
        const res = html.match(reg)
        return resolve(isNull(res) ? released : res[0])
      })
      .catch(reject)
  },
)

export default albumReleased

