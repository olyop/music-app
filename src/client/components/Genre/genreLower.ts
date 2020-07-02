import { ReactNode } from "react"

import { Genre } from "../../types"
import { determinePlural } from "../../helpers"

const genreLower = ({ numOfSongs }: Genre): ReactNode => {
	if (numOfSongs) {
		return `${numOfSongs ? `${numOfSongs} song${determinePlural(numOfSongs)}` : ""}`
	} else {
		return null
	}
}

export default genreLower