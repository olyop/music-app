/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createContext, useContext } from "react"

export function createCtx<T extends {} | null>() {
  const ctx = createContext<T | undefined>(undefined)
  const useCtx = () => {
    const context = useContext(ctx)
    if (context === undefined) {
      throw new Error("useCtx must be inside a Provider with a value")
    } else {
      return context
    }
  }
  return [ useCtx, ctx.Provider ] as const
}
