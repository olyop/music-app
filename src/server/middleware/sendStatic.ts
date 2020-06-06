import express from "express"

import { BUILD_PATH } from "../globals"

export const sendStatic = () => (): void => {
	express.static(BUILD_PATH)
}