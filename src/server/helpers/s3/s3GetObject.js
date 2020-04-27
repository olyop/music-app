import s3 from "../../services/s3.js"
import pipe from "../utilities/pipe.js"
import identity from "lodash/identity.js"
import s3BodyFromRes from "./s3BodyFromRes.js"
import isUndefined from "lodash/isUndefined.js"

import { AWS_S3_BUCKET } from "../../globals/environment.js"

const s3GetObject = args => new Promise(
  (resolve, reject) => {
    const parse = isUndefined(args.parse) ? identity : args.parse
    s3.getObject({ Bucket: AWS_S3_BUCKET, Key: args.key })
      .promise()
      .then(res => pipe(res)(s3BodyFromRes, parse, resolve))
      .catch(reject)
  },
)

export default s3GetObject
