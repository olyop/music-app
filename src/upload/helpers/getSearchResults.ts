import map from "lodash/fp/map"
import identity from "lodash/identity"
import type { DocumentNode } from "graphql"
import type { ApolloClient } from "@apollo/client"

interface Vars {
	query: string,
	exact: boolean,
}

interface Input<Doc, Res, Ret> {
	exact?: boolean,
	query: DocumentNode,
	parseDoc?: (doc: Doc) => Ret,
	parseRes: (res: Res) => Doc[],
}

export const getSearchResults =
	(client: ApolloClient<unknown>) =>
		<Doc, Res, Ret = Doc>({ query, parseRes, parseDoc = identity, exact = false }: Input<Doc, Res, Ret>) =>
			(text: string) =>
				new Promise<Ret[]>(
					(resolve, reject) => {
						const variables = { exact, query: text }
						client
							.query<Res, Vars>({ query, variables })
							.then(({ data }) => data!)
							.then(parseRes)
							.then(map(parseDoc))
							.then(resolve)
							.catch(reject)
					},
				)