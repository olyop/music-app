import fetch from "node-fetch"

import { resolver, toDataUrl } from "../../../helpers"

export const parseUrl =
	resolver<string, { url: string }>(
		async ({ args }) => (
			fetch(args.url)
				.then(res => res.buffer())
				.then(toDataUrl)
		),
	)