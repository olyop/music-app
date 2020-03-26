import React, { Fragment } from "react"

import DocLink from "../DocLink"

import { propTypes } from "./props"
import { determineConcat } from "../../helpers"

const DocLinks = ({ path, docs, ampersand }) => (
  <Fragment>
    {docs.map(
      (doc, idx) => (
        <Fragment key={doc.id}>
          <DocLink doc={doc} path={path} />
          {determineConcat(docs, idx, ampersand)}
        </Fragment>
      ),
    )}
  </Fragment>
)

DocLinks.propTypes = propTypes

export default DocLinks
