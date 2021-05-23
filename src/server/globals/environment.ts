/* eslint-disable node/no-process-env */

export const IS_DEV = process.env.NODE_ENV! === "development"

export const PORT = IS_DEV ? parseInt(process.env.SERVER_PORT!) : 80

export const AWS_RDS_PASSWORD = process.env.AWS_RDS_PASSWORD!
export const AWS_RDS_ENDPOINT = process.env.AWS_RDS_ENDPOINT!

export const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY!
export const ALGOLIA_APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID!

export const SERP_API_KEY = process.env.SERP_API_KEY!
export const SONIC_API_KEY = process.env.SONIC_API_KEY!

export const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET!