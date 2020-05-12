/* eslint-disable */

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

const arrayBufferToBase64 = arraybuffer => {
  // Use a lookup table to find the index.
  const lookup = new Uint8Array(256)
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i
  }

  var bytes = new Uint8Array(arraybuffer)
  var len = bytes.length
  var base64 = ""
  var i

  for (i = 0; i < len; i+=3) {
    base64 += chars[bytes[i] >> 2]
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)]
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)]
    base64 += chars[bytes[i + 2] & 63]
  }

  if ((len % 3) === 2) {
    base64 = base64.substring(0, base64.length - 1) + "="
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "=="
  }

  return base64
}

export default arrayBufferToBase64
