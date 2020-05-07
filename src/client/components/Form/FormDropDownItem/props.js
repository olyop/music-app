import { shape, string, number, func } from "prop-types"

export const propTypes = {
  doc: shape({
    name: string,
    title: string,
  }),
  tabIndex: number.isRequired,
  onFieldHitClick: func.isRequired,
}

export const defaultProps = {
  doc: {
    name: null,
    title: null,
  },
}
