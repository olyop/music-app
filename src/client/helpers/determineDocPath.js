/* eslint-disable prefer-template */

import determineDocIdKey from "./determineDocIdKey"

const determineDocPath = doc =>
  "/" + determineDocIdKey(doc)
    .slice(0, -2)
    .concat("/")
    .concat(doc[determineDocIdKey(doc)])

export default determineDocPath
