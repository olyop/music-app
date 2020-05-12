import { isEmpty } from "lodash"

const trimByChar = (str, char) => {
  const first = [...str].findIndex(character => character !== char)
  const last = [...str].reverse().findIndex(character => character !== char)
  return str.substr(first, str.length - last)
}

export const isFileValidType = ({ type }) =>
  type === "audio/mpeg"

export const isFileValidSize = ({ size }) =>
  size <= 5e7

export const strHasBrackets = str =>
  str.includes("(") && str.includes(")")

export const strFindBrackets = str =>
  str.slice(str.indexOf("(") + 1, str.indexOf(")"))

export const splitList = str =>
  str.split(" ")
     .reduce(
       (list, item) => (
         item.includes(",") ?
           list.concat([trimByChar(item, ","), ","]) :
           list.concat(item)
       ),
       [],
     )
     .flat()
     .reduce(
       ({ temp, list }, item, idx, arr) => (
         idx + 1 === arr.length ?
           { list: list.concat(isEmpty(temp) ? item : `${temp} ${item}`) } :
           (item === "," || item === "&" ?
             { temp: "", list: list.concat(temp) } :
             { list, temp: isEmpty(temp) ? item : `${temp} ${item}` })
       ),
       { temp: "", list: [] },
     )
     .list
