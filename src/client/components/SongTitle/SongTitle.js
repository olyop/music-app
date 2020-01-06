import React, { Fragment } from "react"

import DocLinks from "../DocLinks"

import { isEmpty } from "lodash"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./SongTitle.scss"

const bem = reactBem("SongTitle")

const SongTitle = ({ title, mix, featuring }) => (
  <Fragment>
    {title}
    {isEmpty(featuring) ? null : (
      <Fragment>
        <Fragment> (feat. </Fragment>
        <DocLinks
          path="/artist"
          docs={featuring}
          ampersand={true}
        />
        <Fragment>)</Fragment>
      </Fragment>
    )}
    <span className={bem("mix")}>
      {isEmpty(mix) ? "" : ` - ${mix} Mix`}
    </span>
  </Fragment>
)

SongTitle.propTypes = propTypes

export default SongTitle
