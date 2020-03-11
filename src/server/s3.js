import S3 from "aws-sdk/clients/s3.js"

const ID = "AKIAIBR2GBA7NR3G3BBQ"
const SECRET = "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"

const s3 = new S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
})

export default s3
