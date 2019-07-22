import { stringify } from "./misc"
import { noop } from "lodash"

const serializeJson = res => res.json()

const request = (options, resCallback, errCallback, beforeAndAfterCallback = noop) => {
  const { url, headers } = options
  delete options.url
  delete options.headers
  const init = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...headers
    },
    ...options,
    body: stringify(options.body)
  }
  beforeAndAfterCallback()
  fetch(url, init)
    .then(serializeJson)
    .then(resCallback)
    .catch(errCallback)
    .then(beforeAndAfterCallback)
}

export default request
