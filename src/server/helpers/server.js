const debug = require("debug")("express-gen:server")
const { assign } = require("lodash")

const serializePort = val => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  } else if (port >= 0) {
    return port
  } else {
    return false
  }
}

const onError = ({ syscall, code }) => {
  if (syscall === "listen") {
    const bind = (isString(port) ? "Pipe" : "Port") + " port"
    switch (code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges")
        process.exit(1)
        break
      case "EADDRINUSE":
        console.error(bind + " is already in use")
        process.exit(1)
        break
      default:
        throw error
    }
  } else {
    throw error
  }
}

const onListening = () => debug()

assign(exports, {
  serializePort,
  onError,
  onListening
})
