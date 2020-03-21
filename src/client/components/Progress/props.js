import { number, func } from "prop-types"

export const propTypes = {
  current: number.isRequired,
  duration: number.isRequired,
  setCurrent: func.isRequired,
}
