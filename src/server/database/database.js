import mongoose from "mongoose"

// Initialize database connection
const database = mongoose.createConnection()

database.set("debug", true)

export default database
