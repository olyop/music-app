const mongoose = require("mongoose")

const { GET_DB_URL, MONGOOSE_OPTIONS } = require("../globals")

const Catalog = mongoose.createConnection(GET_DB_URL("catalog"), MONGOOSE_OPTIONS)

Object.assign(exports, {
  Catalog
})
