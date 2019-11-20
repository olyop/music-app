import React, { Fragment } from "react"

import { Link } from "react-router-dom"
import IconText from "../IconText"
import DocLink from "../DocLink"
import Img from "../Img"

import { catalogUrl } from "../../helpers/misc"
import { string, shape } from "prop-types"
import reactBem from "@oly_op/react-bem"

import "./Artist.scss"

const bem = reactBem("Artist")
const bemLibrary = reactBem("Library")

const Artist = ({ artist }) => {
  const { id } = artist
  return (
    <div className={bem("")}>
      <Img
        url={catalogUrl(id)}
        imgClassName={bemLibrary("grid-cover-img")}
        className={bem("cover", { ignore: true, className: bemLibrary("grid-cover") })}
        children={(
          <Fragment>
            <IconText
              text="Play"
              icon="play_arrow"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-top-left", "grid-cover-button")}
            />
            <IconText
              text="Queue"
              icon="queue_music"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-top-right", "grid-cover-button")}
            />
            <Link to={`/artist/${id}`}>
              <IconText
                text="Artist"
                icon="person"
                iconClassName={bemLibrary("grid-cover-button-icon")}
                className={bemLibrary("grid-cover-button-bottom-left", "grid-cover-button")}
              />
            </Link>
            <IconText
              text="Delete"
              icon="delete"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-bottom-right", "grid-cover-button")}
            />
            <div
              className={bemLibrary("grid-cover-black-box")}
            />
          </Fragment>
        )}
      />
      <h2 className={bem("name")}>
        <DocLink
          doc={artist}
          path="/artist"
        />
      </h2>
    </div>
  )
}

Artist.propTypes = {
  artist: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired
}

export default Artist
