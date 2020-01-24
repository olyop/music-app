import React, { Fragment } from "react"

import DocLinks from "../DocLinks"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./SongTitle.scss"

const bem = reactBem("SongTitle")

const SongTitle = ({ mix, title, featuring }) => (
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
      {isEmpty(mix) ? "" : ` ${mix} Mix`}
    </span>
  </Fragment>
)

SongTitle.propTypes = propTypes
SongTitle.defaultProps = defaultProps

export default SongTitle
