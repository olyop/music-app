import React from "react"

import Img from "../Img"
import Info from "../Info"
import SongTitle from "../SongTitle"
import { Link } from "react-router-dom"
import FeaturingArtists from "../FeaturingArtists"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Song")

const Song = ({ song, showCover, className, infoClassName }) => {
  const { artists, featuring, album } = song
  const albumUrl = `/album/${album.albumId}`
  return (
    <div className={bem(className, "")}>
      {showCover ? (
        <Link
          to={albumUrl}
          title={album.title}
          children={(
            <Img
              url={album.cover}
              imgClassName={bem(className, "cover-img")}
              className={bem("cover", "Card", "Elevated")}
            />
          )}
        />
      ) : null}
      <Info
        doc={song}
        className={infoClassName}
        addClassName={bem("info-add")}
        textClassName={bem("info-text")}
        upper={<SongTitle song={song} showRemixers />}
        lower={<FeaturingArtists artists={artists} featuring={featuring} />}
      />
    </div>
  )
}

Song.propTypes = propTypes
Song.defaultProps = defaultProps

export default Song
