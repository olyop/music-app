import express from "express"
import { PUBLIC_PATH } from "../globals"

export const serveStatic = () =>
	express.static(PUBLIC_PATH, { index: false })