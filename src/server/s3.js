import S3 from "aws-sdk/clients/s3.js"

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SCRET_ACCESS_KEY,
})

export default s3
