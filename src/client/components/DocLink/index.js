import React from "react"

import { Link } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { determineDocPath, determineDocNameKey } from "../../helpers"

import "./index.scss"

const bem = reactBem("DocLink")

const DocLink = ({ doc }) => {
  const text = doc[determineDocNameKey(doc)]
  return (
    <Link
      title={text}
      children={text}
      className={bem("")}
      to={determineDocPath(doc)}
    />
  )
}

DocLink.propTypes = propTypes
DocLink.defaultProps = defaultProps

export default DocLink
