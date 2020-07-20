import { isEmpty } from "lodash"

const trimByChar = (str: string, char: string) => {
	const first = [...str].findIndex(character => character !== char)
	const last = [...str].reverse().findIndex(character => character !== char)
	return str.substr(first, str.length - last)
}

export const strHasBrackets = (str: string) =>
	str.includes("(") && str.includes(")")

export const strFindBrackets = (str: string) =>
	str.slice(str.indexOf("(") + 1, str.indexOf(")"))

export const splitList = (str: string) =>
	str.split(" ")
		 .reduce<string[]>(
			 (list, item) => (
				 item.includes(",") ?
					 list.concat([trimByChar(item, ","), ","]) :
					 list.concat(item)
			 ),
			 [],
		 )
		 .flat()
		 .reduce<{ temp: string, list: string[] }>(
			 ({ temp, list }, item, idx, arr) => (
				 idx + 1 === arr.length ?
					 { temp, list: list.concat(isEmpty(temp) ? item : `${temp} ${item}`) } :
					 (item === "," || item === "&" ?
						 { temp: "", list: list.concat(temp) } :
						 { list, temp: isEmpty(temp) ? item : `${temp} ${item}` })
			 ),
			 { temp: "", list: [] },
		 )
		 .list