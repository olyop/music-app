// export const SERVER_URL = ""
export const SERVER_URL = `http://${process.env.HOST}:${process.env.PORT}`

export const API_URL = `${SERVER_URL}/graphql`

export const ROOT_ELEMENT = document.getElementById("Index")

export const S3 = "https://5e0585af655578193c6bd0b0.s3-ap-southeast-2.amazonaws.com/catalog"
