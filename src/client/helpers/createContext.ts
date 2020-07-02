import { createContext as createCtx, useContext } from "react"

export const createContext = <A extends Record<string, unknown> | string | null>() => {
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