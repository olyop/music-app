import multer from "multer"
import { RequestHandler } from "express"

const upload = multer().array("songs", 30)

const addHandler: RequestHandler<unknown, string> =
	(_req, res) => {
		res.send("add")
	}

export const add = [upload, addHandler]

// interface Add extends Multer {
// 	test: string,
// }