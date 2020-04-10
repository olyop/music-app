import { shape, object, func } from "prop-types"

export const propTypes = {
  toggleSidebar: func.isRequired,
  style: shape({ left: object.isRequired }),
}
