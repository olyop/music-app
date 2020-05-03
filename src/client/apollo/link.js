import { createUploadLink } from "apollo-upload-client"

// const SERVER_URL = ""
const SERVER_URL = `http://${process.env.HOST}:${process.env.PORT}`
const API_URL = `${SERVER_URL}/graphql`

const link = createUploadLink({ uri: API_URL })

export default link
