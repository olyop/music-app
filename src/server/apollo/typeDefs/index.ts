import fs from "fs"
import path from "path"
import gql from "graphql-tag"

import { SERVER_PATH } from "../../globals"

const importSchema = (filename: string) =>
	`${fs.readFileSync(path.join(SERVER_PATH, "apollo", "typeDefs", `${filename}.gql`)).toString()}`

const typeDefs = gql`${`
	${importSchema("Scalars")}
	${importSchema("Enums")}
	${importSchema("Input")}
	${importSchema("Query")}
	${importSchema("Mutation")}
	${importSchema("User")}
	${importSchema("Play")}
	${importSchema("Song")}
	${importSchema("Genre")}
	${importSchema("Album")}
	${importSchema("Artist")}
	${importSchema("Playlist")}
`}`

export default typeDefs