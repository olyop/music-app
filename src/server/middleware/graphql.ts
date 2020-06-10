import apollo from "../apollo"
import { APOLLO_MIDDLEWARE_CONFIG } from "../globals"

export const graphql = () =>
	apollo.getMiddleware(APOLLO_MIDDLEWARE_CONFIG)