import { createResolver } from "../../../helpers"

const resolver =
	createResolver()

export const userPrev =
	resolver<string>(() => Promise.resolve("userPrev"))