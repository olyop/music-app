import fs from "fs"
import path from "path"
import gql from "graphql-tag"

const importTypeDefs = () => {
  const dirname = path.resolve()
  const folder = "/src/server/apollo"
  const file = "/typeDefs.graphql"
  const pathToFile = path.join(dirname, folder, file)
  const encoding = "utf8"
  const string = fs.readFileSync(pathToFile, encoding).toString()
  return gql`${string}`
}

export default importTypeDefs
