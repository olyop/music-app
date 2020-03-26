import { shape, bool, string, arrayOf, object } from "prop-types"

export const propTypes = {
  orderByInit: shape({
    order: bool.isRequired,
    field: string.isRequired,
  }),
  columnsToIgnore: arrayOf(string),
  songs: arrayOf(object).isRequired,
}

export const defaultProps = {
  columnsToIgnore: [],
}
