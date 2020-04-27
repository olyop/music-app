import s3 from "../../services/s3.js"

import { AWS_S3_ACL, AWS_S3_BUCKET } from "../../globals/environment.js"

const s3Upload = ({ data, key }) =>
  s3.upload({
    Key: key,
    Body: data,
    ACL: AWS_S3_ACL,
    Bucket: AWS_S3_BUCKET,
  }).promise()

export default s3Upload
