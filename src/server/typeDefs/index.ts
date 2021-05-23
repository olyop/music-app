import fs from "fs"
import path from "path"

import { SERVER_PATH } from "../globals"

const importSchema =
	(filename: string) =>
		`${fs.readFileSync(path.join(SERVER_PATH, "typeDefs", `${filename}.gql`)).toString()}`

const typeDefs = `
	${importSchema("Scalars")}
	${importSchema("Enums")}
	${importSchema("Inputs")}
	${importSchema("Unions")}
	${importSchema("Query")}
	${importSchema("Mutation")}
	${importSchema("Key")}
	${importSchema("User")}
	${importSchema("Play")}
	${importSchema("Song")}
	${importSchema("Genre")}
	${importSchema("Album")}
	${importSchema("Artist")}
	${importSchema("Playlist")}
`

export default typeDefs