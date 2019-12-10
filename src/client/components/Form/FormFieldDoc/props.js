import { shape, string, func } from "prop-types"

export const propTypes = {
  doc: shape({
    name: string,
    title: string,
    id: string.isRequired,
  }),
  onFieldDocRemove: func.isRequired,
}

export const defaultProps = {
  doc: {
    name: undefined,
    title: undefined,
  },
}