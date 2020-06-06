/* eslint-disable prefer-destructuring, @typescript-eslint/no-non-null-assertion */
export const NODE_ENV = process.env.NODE_ENV!

export const HOST = process.env.HOST!

export const DEV_PORT = process.env.DEV_PORT!
export const PORT = parseInt(process.env.PORT!)

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

export const APOLLO_KEY = process.env.APOLLO_KEY!

export const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY!