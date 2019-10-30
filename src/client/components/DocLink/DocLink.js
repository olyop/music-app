import React from "react"

import { NavLink } from "react-router-dom"

import reactBEM from "@oly_op/react-bem"

import "./DocLink.scss"

const bem = reactBEM("DocLink")

const DocLink = ({ path, keyName, doc }) => (
  <NavLink
    children={doc[keyName]}
    className={bem("")}
    to={`${path}/${link.id}`}
  />
)

DocLink.propTypes = {
  path: string.isRequired,
  keyName: string.isRequired,
  doc: object.isRequired
}

export default DocLink
