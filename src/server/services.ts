import { Pool } from "pg"
import S3 from "aws-sdk/clients/s3"

import { AWS_S3_CONFIG, PG_POOL_CONFIG } from "./globals"

export const s3 = new S3(AWS_S3_CONFIG)
export const pg = new Pool(PG_POOL_CONFIG)