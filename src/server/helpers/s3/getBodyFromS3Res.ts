import { Readable } from "stream"
import { GetObjectCommandOutput } from "@aws-sdk/client-s3"

import { concatStream } from "../utils/concatStream"

export const getBodyFromS3Res = async (res: GetObjectCommandOutput) =>
	concatStream(res.Body! as Readable)