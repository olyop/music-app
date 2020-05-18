import React, { Fragment } from "react"

import DocLinks from "../DocLinks"

import { isEmpty } from "lodash"
import { arrayOf, object } from "prop-types"

const FeaturingArtists = ({ artists, featuring }) => (
  <Fragment>
    <DocLinks ampersand docs={artists} />
    {isEmpty(featuring) ? null : (
      <Fragment>
        <Fragment> feat. </Fragment>
        <DocLinks ampersand docs={featuring} />
      </Fragment>
    )}
  </Fragment>
)

FeaturingArtists.propTypes = {
  artists: arrayOf(object).isRequired,
  featuring: arrayOf(object).isRequired,
}

export default FeaturingArtists
