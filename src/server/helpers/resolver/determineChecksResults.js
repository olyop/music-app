const determineChecksResults = checks =>
  Promise.all(checks.map(({ check }) => check))

export default determineChecksResults
