import { S3 } from "../globals"

export const catalogUrl = ({ id }) => `${S3}/${id}.jpg`
