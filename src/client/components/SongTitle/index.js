import React, { Fragment } from "react"

import DocLink from "../DocLink"
import DocLinks from "../DocLinks"

import { isEmpty } from "lodash"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("SongTitle")

const SongTitle = ({ song, showRemixers }) => {
  const { mix, remixers } = song
  if (showRemixers) {
    return (
      <Fragment>
        <DocLink
          doc={song}
          path="/song"
        />
        {isEmpty(remixers) ? (
          <Fragment>
            {isEmpty(mix) ? null : (
              <span className={bem("mix")}>
                <Fragment> - </Fragment>
                {mix}
                <Fragment> Mix</Fragment>
              </span>
            )}
          </Fragment>
        ) : (
          <span className={bem("mix")}>
            <Fragment> - </Fragment>
            <DocLinks
              ampersand
              path="/artist"
              docs={remixers}
            />
            <Fragment> </Fragment>
            {mix}
            <Fragment> Remix</Fragment>
          </span>
        )}
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <DocLink
          doc={song}
          path="/song"
        />
        {isEmpty(mix) ? null : (
          <span className={bem("mix")}>
            <Fragment> - </Fragment>
            {mix}
            <Fragment> Mix</Fragment>
          </span>
        )}
      </Fragment>
    )
  }
}

SongTitle.propTypes = propTypes

export default SongTitle
