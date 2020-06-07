import { pipe } from "../utils"

const addNames = checks => results =>
	results.map((check, index) => ({
		check,
		name: checks[index].name,
	}))

const filterPassed = checks =>
	checks.filter(({ check }) => !check)

const mapNames = checks =>
	checks.map(({ name }) => name)

export const determineFailedChecks = (checks, results) => pipe(results)(
	addNames(checks),
	filterPassed,
	mapNames,
)