import path from "path"
import gql from "graphql-tag"

import { importFile } from "../../helpers"
import { SERVER_PATH } from "../../globals"

const importSchema = (filename: string) =>
	`${importFile(path.join(SERVER_PATH, "apollo", "typeDefs", `${filename}.gql`))}`

const typeDefs = gql`${`
	${importSchema("Scalars")}
	${importSchema("Enums")}
	${importSchema("Inputs")}
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