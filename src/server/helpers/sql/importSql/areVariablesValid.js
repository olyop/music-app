import keys from "lodash/keys.js"
import includes from "lodash/includes.js"

const areVariablesValid = (variables, names) => {
  const inputKeys = keys(variables)
  return names.reduce(
    (_, name) => !includes(inputKeys, name),
    false,
  )
}

export default areVariablesValid
