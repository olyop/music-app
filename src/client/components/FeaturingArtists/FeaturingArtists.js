import React from "react"

import Links from "../Links"

import { arrayOf, object } from "prop-types"
import reactBEM from "@oly_op/react-bem"
import { isEmpty } from "lodash"

const bem = reactBEM("FeaturingArtists")

const FeaturingArtists = ({ artists, featuring }) => (
  <div className={bem("")}>
    <Links
      path="/artist"
      links={artists}
    />
    {isEmpty(featuring) ? null : <>
      <span> feat. </span>
      <Links
        path="/artist"
        links={featuring}
      />
    </>}
  </div>
)

FeaturingArtists.propTypes = {
  artists: arrayOf(object).isRequired,
  featuring: arrayOf(object).isRequired
}

export default FeaturingArtists
