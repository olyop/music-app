import React, { Fragment } from "react"

import DocLink from "../DocLink"

import { arrayOf, object, string } from "prop-types"

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

const DocLinks = ({ path, docs }) => (
  <Fragment>
    {docs.map(
      (doc, index) => (
        <Fragment key={doc.id}>
          <DocLink doc={doc} path={path} />
          {determineConcat(docs, index)}
        </Fragment>
      )
    )}
  </Fragment>
)

DocLinks.propTypes = {
  path: string.isRequired,
  docs: arrayOf(object).isRequired
}

export default DocLinks
