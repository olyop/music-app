import React from "react"

import {
  determineDocIdKey,
  determineDocNameKey,
} from "../../helpers"

import { Link } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("DocLink")

const DocLink = ({ path, doc }) => {
  const text = doc[determineDocNameKey(doc)]
  return (
    <Link
      title={text}
      children={text}
      className={bem("")}
      to={`${path}/${doc[determineDocIdKey(doc)]}`}
    />
  )
}

DocLink.propTypes = propTypes
DocLink.defaultProps = defaultProps

export default DocLink
