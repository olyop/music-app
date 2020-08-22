import pipe from "@oly_op/pipe"

import { Check, CheckRes } from "../types"

const addNames = (checks: Check[]) => (results: boolean[]) =>
	results.map((check, index) => ({
		check,
		name: checks[index].name,
	}))

const filterPassed = (checks: CheckRes[]) =>
	checks.filter(({ check }) => !check)

const mapNames = (checks: CheckRes[]) =>
	checks.map(({ name }) => name)

export const determineFailedChecks = (checks: Check[], results: boolean[]) =>
	pipe(addNames(checks), filterPassed, mapNames)(results)