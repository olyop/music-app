import express from "express"

export const sendStatic = (path: string) =>
	express.static(path)