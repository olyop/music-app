import React, { Fragment } from "react"

import DocLink from "../DocLink"

import { isEmpty } from "lodash"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./SongTitle.scss"

const bem = reactBem("SongTitle")

const SongTitle = ({ song }) => {
  const { mix } = song
  return (
    <Fragment>
      <DocLink
        doc={song}
        path="/song"
      />
      <span className={bem("mix")}>
        {isEmpty(mix) ? "" : ` - ${mix} Mix`}
      </span>
    </Fragment>
  )
}

SongTitle.propTypes = propTypes

export default SongTitle
