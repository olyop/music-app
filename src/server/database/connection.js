const mongoose = require("mongoose")

// Initialize database connection
const database = mongoose.createConnection()

module.exports = database
