import React from "react"

import Img from "../Img"
import SongTitle from "../SongTitle"
import { Link } from "react-router-dom"
import AddToLibrary from "../AddToLibrary"
import FeaturingArtists from "../FeaturingArtists"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./Song.scss"

const bem = reactBem("Song")

const Song = ({ song, showAdd, showCover, className }) => {
  const { artists, featuring, album } = song
  return (
    <div className={bem({ ignore: true, className },"")}>
      {showCover ? (
        <Link to={`/album/${album.id}`} title={album.title}>
          <Img
            url={album.cover}
            className={bem("cover")}
            imgClassName={bem("cover-img")}
          />
        </Link>
      ) : null}
      <div className={bem("text")}>
        <p className={bem("text-title")}>
          <span><SongTitle song={song} showRemixers /></span>
          {showAdd ? (
            <AddToLibrary
              doc={song}
              className={bem("text-title-add")}
            />
          ) : null}
        </p>
        <p className={bem("text-artists")}>
          <FeaturingArtists
            artists={artists}
            featuring={featuring}
          />
        </p>
      </div>
    </div>
  )
}

Song.propTypes = propTypes
Song.defaultProps = defaultProps

export default Song
