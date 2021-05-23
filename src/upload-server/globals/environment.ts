/* eslint-disable node/no-process-env */
export const IS_DEV = process.env.NODE_ENV! === "development"

export const PORT = IS_DEV ? parseInt(process.env.UPLOAD_SERVER_PORT!) : 80

export const AWS_RDS_PASSWORD = process.env.AWS_RDS_PASSWORD!
export const AWS_RDS_ENDPOINT = process.env.AWS_RDS_ENDPOINT!

export const SERP_API_KEY = process.env.SERP_API_KEY!
export const SONIC_API_KEY = process.env.SONIC_API_KEY!