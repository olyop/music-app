export const IS_DEV = process.env.NODE_ENV! === "development"

export const PORT = process.env.DEV_UPLOAD_SERVER_PORT ?
	parseInt(process.env.DEV_UPLOAD_SERVER_PORT) : 80

export const APP_NAME = process.env.APP_NAME!

export const AWS_RDS_PASSWORD = process.env.AWS_RDS_PASSWORD!
export const AWS_RDS_ENDPOINT = process.env.AWS_RDS_ENDPOINT!

export const SERP_API_KEY = process.env.SERP_API_KEY!
export const SONIC_API_KEY = process.env.SONIC_API_KEY!