import React, { Fragment } from "react"

import DocLinks from "../DocLinks"

import { arrayOf, object } from "prop-types"
import { isEmpty } from "lodash"

const FeaturingArtists = ({ artists, featuring }) => (
  <Fragment>
    <DocLinks
      keyName="name"
      path="/artist"
      docs={artists}
    />
    {isEmpty(featuring) ? null : (
      <Fragment>
        <Fragment> feat. </Fragment>
        <DocLinks
          keyName="name"
          path="/artist"
          docs={featuring}
        />
      </Fragment>
    )}
  </Fragment>
)

FeaturingArtists.propTypes = {
  artists: arrayOf(object).isRequired,
  featuring: arrayOf(object).isRequired
}

export default FeaturingArtists
