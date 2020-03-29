import { S3 } from "../globals"

const catalogUrl = ({ id }) => `${S3}/${id}.jpg`

export default catalogUrl
