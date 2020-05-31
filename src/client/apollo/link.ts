import { createUploadLink } from "apollo-upload-client"

const SERVER_URL = process.env.NODE_ENV === "production" ?
	"" : `http://${process.env.HOST!}:${process.env.PORT!}`

const API_URL = `${SERVER_URL}/graphql`

const link = createUploadLink({ uri: API_URL })

export default link