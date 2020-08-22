import { Check } from "../types"

export const determineChecksResults = (checks: Check[]) =>
	Promise.all(checks.map(({ check }) => check))