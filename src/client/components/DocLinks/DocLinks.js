import React, { Fragment } from "react"

import DocLink from "../DocLink"

import { propTypes } from "./props"
import determineConcat from "../../helpers/determineConcat"

const DocLinks = ({ path, docs, ampersand }) => (
  <Fragment>
    {docs.map(
      (doc, index) => (
        <Fragment key={doc.id}>
          <DocLink doc={doc} path={path} />
          {determineConcat(docs, index, ampersand)}
        </Fragment>
      )
    )}
  </Fragment>
)

DocLinks.propTypes = propTypes

export default DocLinks
