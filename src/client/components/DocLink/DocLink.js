import React from "react"

import { Link } from "react-router-dom"

import { string, shape } from "prop-types"
import reactBEM from "@oly_op/react-bem"
import { isUndefined } from "lodash"

import "./DocLink.scss"

const determineKeyName = doc => {
  if (!isUndefined(doc.name)) return "name"
  else if (!isUndefined(doc.title)) return "title"
  else return "name"
}

const bem = reactBEM("DocLink")

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

DocLink.propTypes = {
  path: string.isRequired,
  doc: shape({ id: string.isRequired }).isRequired
}

export default DocLink
