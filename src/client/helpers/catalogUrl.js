import { S3 } from "../globals"
import determineDocIdKey from "./determineDocIdKey"

const catalogUrl = doc => `${S3}/${doc[determineDocIdKey(doc)]}.jpg`

export default catalogUrl
