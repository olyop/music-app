import fs from "fs"
import path from "path"
import gql from "graphql-tag"
import { SERVER_PATH } from "../../globals/paths.js"

const importSchema = filename =>
  `${fs.readFileSync(path.join(SERVER_PATH, "apollo", "typeDefs", `${filename}.gql`)).toString()}`

const typeDefsString = `
  ${importSchema("Scalars")}
  ${importSchema("Enums")}
  ${importSchema("Query")}
  ${importSchema("Mutation")}
  ${importSchema("User")}
  ${importSchema("Play")}
  ${importSchema("Song")}
  ${importSchema("Genre")}
  ${importSchema("Album")}
  ${importSchema("Artist")}
  ${importSchema("Playlist")}
`

const typeDefs = gql`${typeDefsString}`

export default typeDefs
