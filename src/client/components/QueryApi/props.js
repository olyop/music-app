import { func, string, any, bool } from "prop-types"

export const propTypes = {
  spinner: bool,
  library: bool,
  variables: any,
  checkEmpty: bool,
  className: string,
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
  className: null,
  checkEmpty: false,
  spinnerClassName: null,
}
