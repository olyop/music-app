import { shape, string, number, func } from "prop-types"

export const propTypes = {
  doc: shape({
    name: string,
    title: string,
    id: string.isRequired,
  }),
  tabIndex: number.isRequired,
  onFieldHitClick: func.isRequired,
}

export const defaultProps = {
  doc: {
    name: undefined,
    title: undefined,
  },
}
