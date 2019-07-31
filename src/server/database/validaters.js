const { assign, inRange } = require("lodash")

const validateYear = year => inRange(year, new Date().getFullYear())

assign(exports, { validateYear })
