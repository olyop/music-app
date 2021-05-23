// eslint-disable-next-line import/no-extraneous-dependencies
import { ApolloCache, Modifier, Reference } from "@apollo/client/cache"

import { MutationData, UserFieldModiferInput } from "./types"

const userFieldModifer =
	({ docId, docKey, docTypeName, inLibrary }: UserFieldModiferInput) =>
		(cache: ApolloCache<MutationData>): Modifier<Reference[]> =>
			(existing, { readField }) => {
				if (inLibrary) {
					return existing.filter(x => docId !== readField(docKey, x))
				} else {
					if (existing.some(ref => readField(docKey, ref) === docId)) {
						return existing
					} else {
						const doc = { __typename: docTypeName, [docKey]: docId }
						return [...existing, { __ref: cache.identify(doc)! }]
					}
				}
			}

export default userFieldModifer