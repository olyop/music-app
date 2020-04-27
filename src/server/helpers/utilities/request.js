const request = callback => (req, res, nxt) => callback({ req, res, nxt })

export default request
