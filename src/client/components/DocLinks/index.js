import React, { Fragment } from "react"

import DocLink from "../DocLink"

import { propTypes } from "./props"
import { determineConcat, determineDocIdKey } from "../../helpers"

const DocLinks = ({ path, docs, ampersand }) => (
  <Fragment>
    {docs.map(
      (doc, index) => (
        <Fragment key={doc[determineDocIdKey(doc)]}>
          <DocLink doc={doc} path={path} />
          {determineConcat(docs, index, ampersand)}
        </Fragment>
      ),
    )}
  </Fragment>
)

DocLinks.propTypes = propTypes

export default DocLinks
