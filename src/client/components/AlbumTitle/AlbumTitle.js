import React, { Fragment } from "react"

import DocLinks from "../DocLinks"
import DocLink from "../DocLink"

import { string, arrayOf, object } from "prop-types"
import reactBEM from "@oly_op/react-bem"
import { isEmpty } from "lodash"

import "./AlbumTitle.scss"

const bem = reactBEM("AlbumTitle")

const AlbumTitle = ({ id, title, remixers }) => (
  <Fragment>
    <DocLink
      path="/album"
      keyName="title"
      doc={{ id, title }}
    />
    {isEmpty(remixers) ? null : (
      <span className={bem("remixers")}>
        <Fragment> - </Fragment>
        <DocLinks
          path="/artist"
          keyName="name"
          docs={remixers}
        />
        <Fragment> Remix</Fragment>
      </span>
    )}
  </Fragment>
)

AlbumTitle.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  remixers: arrayOf(object).isRequired
}

export default AlbumTitle
