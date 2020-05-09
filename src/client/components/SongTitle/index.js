import React, { Fragment } from "react"

import DocLink from "../DocLink"
import DocLinks from "../DocLinks"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { shape, string, bool } from "prop-types"

import "./index.scss"

const bem = reactBem("SongTitle")

const SongTitle = ({ song, showRemixers }) => {
  const { mix, remixers } = song
  if (showRemixers) {
    return (
      <Fragment>
        <DocLink doc={song} />
        {isEmpty(remixers) ? (
          <Fragment>
            {isEmpty(mix) ? null : (
              <span className={bem("")}>
                <Fragment> - </Fragment>
                {mix}
                <Fragment> Mix</Fragment>
              </span>
            )}
          </Fragment>
        ) : (
          <span className={bem("")}>
            <Fragment> - </Fragment>
            <DocLinks
              ampersand
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
        <DocLink doc={song} />
        {isEmpty(mix) ? null : (
          <span className={bem("")}>
            <Fragment> - </Fragment>
            {mix}
            <Fragment> Mix</Fragment>
          </span>
        )}
      </Fragment>
    )
  }
}

SongTitle.propTypes = {
  song: shape({
    mix: string.isRequired,
    title: string.isRequired,
    songId: string.isRequired,
  }),
  showRemixers: bool,
}

SongTitle.defaultProps = {
  showRemixers: true,
}

export default SongTitle
