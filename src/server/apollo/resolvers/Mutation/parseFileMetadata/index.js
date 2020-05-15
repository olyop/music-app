import parseFile from "./parseFile.js"
import ApolloServerExpress from "apollo-server-express"
import isAudio from "../../../../helpers/validators/isAudio.js"
import uploadFileFromClient from "../../../../helpers/resolver/uploadFileFromClient.js"

const { UserInputError } = ApolloServerExpress

const parseFileMetadata = async ({ args }) => {
  const file = await uploadFileFromClient(args.file)
  if (!isAudio(file)) {
    throw new UserInputError("Invalid file type/size.")
  } else {
    return parseFile(file)
  }
}

export default parseFileMetadata
