import s3 from "../../aws/s3.js"
import { AWS_S3_ACL, AWS_S3_BUCKET } from "../../globals.js"

const uploadFileToS3 = ({ file, key }) =>
  s3.upload({
    Key: key,
    Body: file,
    ACL: AWS_S3_ACL,
    Bucket: AWS_S3_BUCKET,
  }).promise()

export default uploadFileToS3
