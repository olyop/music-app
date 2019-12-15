import React, { Fragment } from "react"

import Img from "../Img"
import DocLinks from "../DocLinks"
import { Link } from "react-router-dom"
import FeaturingArtists from "../FeaturingArtists"

import { isEmpty } from "lodash"
import { propTypes } from "./props" 
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"
import deserializeDuration from "../../helpers/deserializeDuration"

import "./Song.scss"

const bem = reactBem("Song")

const Song = ({ song }) => {
  const { title, mix, duration, artists, featuring, remixers, album } = song
  return (
    <div className={bem("")}>
      <Link to={`/album/${album.id}`}>
        <Img 
          className={bem("cover")}
          url={catalogUrl(album.id)}
          imgClassName={bem("cover-img")}
        />
      </Link>
      <div className={bem("info")}>
        <div className={bem("info-title")}>
          {title}
          {isEmpty(remixers) ? null : <Fragment>
            <span className={bem("info-mix")}>
              <Fragment> - </Fragment>
              <DocLinks
                path="/artist"
                docs={remixers}
                ampersand={true}
              />
              <Fragment> </Fragment>
              {mix}
              <Fragment> Remix</Fragment>
            </span>
          </Fragment>}
        </div>
        <div className={bem("info-artists")}>
          <FeaturingArtists
            artists={artists}
            featuring={featuring}
          />
        </div>
        <div className={bem("info-bar")}>
          <div className={bem("info-time")}>0:00</div>
          <div className={bem("info-progress")}/>
          <div className={bem("info-duration")}>{deserializeDuration(duration)}</div>
        </div>
      </div>
    </div>
  )
}

Song.propTypes = propTypes

export default Song
