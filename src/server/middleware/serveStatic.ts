import express from "express"
import { BUILD_CLIENT_PATH } from "../globals"

export const serveStatic = () =>
	express.static(BUILD_CLIENT_PATH, { index: false })