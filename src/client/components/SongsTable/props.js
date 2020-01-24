import { string, arrayOf, object } from "prop-types"

export const propTypes = {
  columnsToIgnore: arrayOf(string),
  songs: arrayOf(object).isRequired,
}

export const defaultProps = {
  columnsToIgnore: [],
}
