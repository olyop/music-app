import { func, string, any, bool } from "prop-types"

export const propTypes = {
  spinner: bool,
  library: bool,
  variables: any,
  checkEmpty: bool,
  resultPath: string,
  query: any.isRequired,
  spinnerClassName: string,
  children: func.isRequired,
}

export const defaultProps = {
  spinner: true,
  variables: {},
  resultPath: "",
  library: false,
  checkEmpty: false,
}
