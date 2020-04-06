import { func, string, any, bool } from "prop-types"

export const propTypes = {
  library: bool,
  query: any.isRequired,
  children: func.isRequired,
  resultPath: string.isRequired,
}

export const defaultProps = {
  library: false,
}
