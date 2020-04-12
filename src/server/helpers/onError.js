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

export default onError