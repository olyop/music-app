import { createUploadLink } from "apollo-upload-client"

import { API_URL } from "../globals"

const link = createUploadLink({
  uri: API_URL,
})

export default link
