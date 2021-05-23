import { RequestHandler } from "express"
import { search } from "@oly_op/pg-helpers"

import { pg } from "../services"
import { SearchParams } from "../types"

export const genreSearch: RequestHandler<SearchParams> =
	async (req, res) => {
		res.json(await search(pg)({
			exact: false,
			columnName: "name",
			tableName: "genres",
			columnNames: ["name", "genre_id"],
			value: req.params.value.replace(/\+/g, " "),
		}))
	}