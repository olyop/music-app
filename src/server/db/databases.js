const mongoose = require("mongoose")
const { assign } = require("lodash")

const { GET_DB_URL, MONGOOSE_OPTIONS } = require("../globals")

const Catalog = mongoose.createConnection(
  GET_DB_URL("catalog"),
  MONGOOSE_OPTIONS
)

assign(exports, { Catalog })
