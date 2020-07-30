import map from "lodash/fp/map"
import type { DocumentNode } from "graphql"
import { ApolloClient } from "@apollo/client"

interface Vars {
	query: string,
	exact: boolean,
}

interface Input<Doc, Res> {
	exact?: boolean,
	query: DocumentNode,
	parseRes: (res: Res) => Doc[],
	parseDoc: (doc: Doc) => string,
}

export const searchQuery =
	(apollo: ApolloClient<unknown>) =>
		<Doc, Res>({ query, parseRes, parseDoc, exact = false }: Input<Doc, Res>) =>
			(text: string) =>
				new Promise<string[]>(
					(resolve, reject) => {
						const variables = { exact, query: text }
						apollo
							.query<Res, Vars>({ query, variables })
							.then(({ data }) => data!)
							.then(parseRes)
							.then(map(parseDoc))
							.then(resolve)
							.catch(reject)
					},
				)