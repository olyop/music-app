import fetch from "node-fetch"

import { toDataUrl } from "../../../helpers"

const fetchAndParseUrl =
	(url: string) =>
		new Promise<string>(
			(resolve, reject) => {
				fetch(url)
					.then(res => res.buffer())
					.then(toDataUrl)
					.then(resolve)
					.catch(reject)
			},
		)

export default fetchAndParseUrl