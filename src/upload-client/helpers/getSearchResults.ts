import map from "lodash/fp/map"
import identity from "lodash/identity"

interface Vars {
	query: string,
	exact: boolean,
}

interface Input<Doc, Res, Ret> {
	exact?: boolean,
	parseDoc?: (doc: Doc) => Ret,
	parseRes: (res: Res) => Doc[],
}

export const getSearchResults =
	<Doc, Res, Ret = Doc>({ query, parseRes, exact = false, parseDoc = identity }: Input<Doc, Res, Ret>) =>
		(text: string) =>
			new Promise<Ret[]>(
				(resolve, reject) => {
					const variables = { exact, query: text }
					client
						.query<Res, Vars>({ query, variables })
						.then(({ data }) => data)
						.then(parseRes)
						.then(map(parseDoc))
						.then(resolve)
						.catch(reject)
				},
			)