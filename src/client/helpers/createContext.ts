/*
	eslint-disable
		@typescript-eslint/ban-types,
		@typescript-eslint/explicit-module-boundary-types
*/
import { createContext as createCtx, useContext } from "react"

export const createContext = <A extends {} | null>() => {
	const ctx = createCtx<A | undefined>(undefined)
	function useCtx() {
		const context = useContext(ctx)
		if (context === undefined) {
			throw new Error("useCtx must be inside a Provider with a value")
		} else {
			return context
		}
	}
	return [ useCtx, ctx.Provider ] as const
}