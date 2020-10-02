export const IS_DEV = process.env.NODE_ENV! === "development"

export const HOST = process.env.HOST!

export const PORT = parseInt(IS_DEV ? process.env.DEV_SERVER_PORT! : process.env.SERVER_PORT!)

export const APP_NAME = process.env.APP_NAME!

export const AWS_RDS_DB = process.env.AWS_RDS_DB!
export const AWS_RDS_USER = process.env.AWS_RDS_USER!
export const AWS_RDS_PASSWORD = process.env.AWS_RDS_PASSWORD!
export const AWS_RDS_ENDPOINT = process.env.AWS_RDS_ENDPOINT!
export const AWS_RDS_PORT = parseInt(process.env.AWS_RDS_PORT!)

export const AWS_S3_ACL = process.env.AWS_S3_ACL!
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET!
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!

export const SERP_API_KEY = process.env.SERP_API_KEY!

export const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY!
export const ALGOLIA_APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID!