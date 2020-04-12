export const SERVER_PORT = 3000
export const DEV_SERVER_PORT = 8080

export const LOCALHOST = "http://192.168.1.102"
export const SERVER_URL = `${LOCALHOST}:${SERVER_PORT}`
// export const SERVER_URL = ""

export const API_URL = `${SERVER_URL}/graphql`

export const ROOT_ELEMENT = document.getElementById("Index")

export const S3 = "https://5e0585af655578193c6bd0b0.s3-ap-southeast-2.amazonaws.com/catalog"

export const OPENID_SCOPE = "openid profile email"
export const AUTH0_DOMAIN = "dev-ttsv9wvu.au.auth0.com"
export const AUTH0_RESPONSE_TYPE = "token id_token"
export const AUTH0_CLIENTID = "10u3OKcXtg3l8FcoLsEflUNUdsM0pNHP"

export const WEB_AUTH_OPTIONS = {
  scope: OPENID_SCOPE,
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENTID,
  responseType: AUTH0_RESPONSE_TYPE,
  redirectUri: `${LOCALHOST}:${DEV_SERVER_PORT}`,
}
