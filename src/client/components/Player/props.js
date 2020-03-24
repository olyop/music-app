import { shape, func } from "prop-types"

export const propTypes = {
  history: shape({
    goBack: func.isRequired,
  }),
}
