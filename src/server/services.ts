import { Pool } from "pg"
import algolia from "algoliasearch"
import { S3Client } from "@aws-sdk/client-s3"

import { ALGOLIA_CONFIG, PG_POOL_CONFIG } from "./globals"

export const s3 = new S3Client()
export const pg = new Pool(PG_POOL_CONFIG)
export const ag = algolia(...ALGOLIA_CONFIG)