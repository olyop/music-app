import React, { Fragment } from "react"

import DocLinks from "../DocLinks"

import { isEmpty } from "lodash"
import { propTypes } from "./props"

const FeaturingArtists = ({ artists, featuring }) => (
  <Fragment>
    <DocLinks
      ampersand
      path="/artist"
      docs={artists}
    />
    {isEmpty(featuring) ? null : (
      <Fragment>
        <Fragment> feat. </Fragment>
        <DocLinks
          ampersand
          path="/artist"
          docs={featuring}
        />
      </Fragment>
    )}
  </Fragment>
)

FeaturingArtists.propTypes = propTypes

export default FeaturingArtists
