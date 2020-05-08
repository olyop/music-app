import React, { Fragment } from "react"

import DocLink from "../DocLink"

import { bool, arrayOf, object } from "prop-types"
import { determineConcat, determineDocIdKey } from "../../helpers"

const DocLinks = ({ docs, ampersand }) => (
  <Fragment>
    {docs.map(
      (doc, index) => (
        <Fragment key={doc[determineDocIdKey(doc)]}>
          <DocLink doc={doc} />
          {determineConcat(docs, index, ampersand)}
        </Fragment>
      ),
    )}
  </Fragment>
)

DocLinks.propTypes = {
  ampersand: bool.isRequired,
  docs: arrayOf(object).isRequired,
}

export default DocLinks
