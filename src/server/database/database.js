import mongoose from "mongoose"

// Initialize database connection
const database = mongoose.createConnection()

database.set("useFindAndModify", false)

export default database
