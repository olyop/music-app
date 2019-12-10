import React from "react"

import { Link } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import determineKeyName from "../../helpers/determineKeyName"

import "./DocLink.scss"

const bem = reactBem("DocLink")

const DocLink = ({ path, doc }) => {
  const text = doc[determineKeyName(doc)]
  return (
    <Link
      title={text}
      children={text}
      className={bem("")}
      to={`${path}/${doc.id}`}
    />
  )
}

DocLink.propTypes = propTypes
DocLink.defaultProps = defaultProps

export default DocLink