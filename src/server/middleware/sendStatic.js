import express from "express"

import { BUILD_PATH } from "../globals.js"

const sendStatic = express.static(BUILD_PATH)

export default () => sendStatic
