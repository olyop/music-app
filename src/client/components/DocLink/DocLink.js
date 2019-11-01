import React from "react"

import { NavLink } from "react-router-dom"

import { string, shape } from "prop-types"
import reactBEM from "@oly_op/react-bem"

import "./DocLink.scss"

const bem = reactBEM("DocLink")

const DocLink = ({ path, keyName, doc }) => (
  <NavLink
    className={bem("")}
    children={doc[keyName]}
    to={`${path}/${doc.id}`}
  />
)

DocLink.propTypes = {
  path: string.isRequired,
  keyName: string.isRequired,
  doc: shape({ id: string.isRequired }).isRequired
}

export default DocLink
