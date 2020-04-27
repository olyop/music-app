import express from "express"

import { BUILD_PATH } from "../globals/paths.js"

const sendStatic = express.static(BUILD_PATH)

export default () => sendStatic
