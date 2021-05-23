import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import express from "express"
import compression from "compression"
import { json, urlencoded } from "body-parser"
import { LOG_FORMAT } from "@oly_op/music-app-common/globals"

import {
	PORT,
	CORS_CONFIG,
	PUBLIC_PATH,
	HELMET_OPTIONS,
} from "./globals"

import {
	add,
	serveClient,
	genreSearch,
	artistSearch,
	artistPhotoSearch,
} from "./middleware"

const app = express()

app.use(
	morgan(LOG_FORMAT),
	helmet(HELMET_OPTIONS),
	cors(CORS_CONFIG),
	compression(),
	json(),
	urlencoded({ extended: false }),
)

app.get("/genreSearch/:value", genreSearch)
app.get("/artistSearch/:value", artistSearch)
app.get("/artistPhotoSearch/:value", artistPhotoSearch)

app.post("/add", add)

app.use(
	express.static(PUBLIC_PATH, { index: false }),
	serveClient(),
)

app.listen(PORT)