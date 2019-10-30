import React from "react"

import { NavLink } from "react-router-dom"

import { arrayOf, object, string } from "prop-types"
import reactBEM from "@oly_op/react-bem"

import "./DocLinks.scss"

const bem = reactBEM("DocLinks")

const determineConcat = (docs, index) => {
  const numOfDocs = docs.length
  if (numOfDocs - 2 === index) {
    return " & "
  } else if (numOfDocs - 1 === index) {
    return null
  } else {
    return ", "
  }
}

const DocLinks = ({ path, keyName, docs }) => (
  <span className={bem("")}>
    {docs.map(
      (doc, index) => (
        <span key={doc.id}>
          <Link
            children={doc[keyName]}
            to={`${path}/${doc.id}`}
          />
          {determineConcat(docs, index)}
        </span>
      )
    )}
  </span>
)

DocLinks.propTypes = {
  path: string.isRequired,
  keyName: string.isRequired,
  docs: arrayOf(object).isRequired
}

export default DocLinks
