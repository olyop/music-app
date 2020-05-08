import React, { Fragment } from "react"

import DocLinks from "../DocLinks"

import { isEmpty } from "lodash"
import { propTypes } from "./props"

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

FeaturingArtists.propTypes = propTypes

export default FeaturingArtists
