import { pipe } from "../utils"

type Check = {
	name: string,
	check: boolean,
}

const addNames = (checks: Check[]) => (results: boolean[]) =>
	results.map((check, index) => ({
		check,
		name: checks[index].name,
	}))

const filterPassed = (checks: Check[]) =>
	checks.filter(({ check }) => !check)

const mapNames = (checks: Check[]) =>
	checks.map(({ name }) => name)

export const determineFailedChecks = (checks: Check[], results: boolean[]) =>
	pipe(addNames(checks), filterPassed, mapNames)(results)