const isHex = str => (str.match(/([0-9]|[a-f])/gim) || []).length === str.length

export default isHex
