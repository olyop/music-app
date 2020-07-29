import type { DocumentNode } from "graphql"
import { ApolloClient } from "@apollo/client"

interface Vars {
	query: string,
	exact: boolean,
}

export const searchQuery =
	(apollo: ApolloClient<unknown>) =>
		<T>(query: DocumentNode, exact = false) =>
			(text: string) =>
				new Promise<T | null>(
					(resolve, reject) => {
						const variables = { exact, query: text }
						apollo.query<T | null, Vars>({ query, variables })
							.then(({ data }) => data || null)
							.then(resolve)
							.catch(reject)
					},
				)