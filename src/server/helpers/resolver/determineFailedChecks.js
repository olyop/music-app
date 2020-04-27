import pipe from "../utilities/pipe.js"

const addNames = checks => results => results.map((check, index) => ({
  check,
  name: checks[index].name,
}))

const filterPassed = checks => checks.filter(({ check }) => !check)

const mapNames = checks => checks.map(({ name }) => name)

const determineFailedChecks = (checks, results) => pipe(results)(
  addNames(checks),
  filterPassed,
  mapNames,
)

export default determineFailedChecks
