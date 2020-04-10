import { func, string, any, bool } from "prop-types"

export const propTypes = {
  library: bool,
  variables: any,
  checkEmpty: bool,
  resultPath: string,
  query: any.isRequired,
  children: func.isRequired,
}

export const defaultProps = {
  variables: {},
  resultPath: "",
  library: false,
  checkEmpty: false,
}
