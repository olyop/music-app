import uniq from "lodash/uniq.js"

const listVariableKeys = sql => {
  const variableNames = []

  let inCurly = false
  let tempVar = ""
  let inVariable = false

  for (const char of sql) {
    if (inVariable) {
      if (char === " ") {
        variableNames.push(tempVar)
        inVariable = false
        tempVar = ""
      } else {
        tempVar += char
      }
    } else if (inCurly) {
      if (char === " ") {
        inVariable = true
      } else if (char === "}") {
        inCurly = false
      }
    } else if (char === "{") {
      inCurly = true
    }
  }

  return uniq(variableNames)
}

export default listVariableKeys
