import { Pool } from "pg"
import { S3 } from "@aws-sdk/client-s3"

import { PG_POOL_CONFIG } from "./globals"

export const s3 = new S3({})
export const pg = new Pool(PG_POOL_CONFIG)