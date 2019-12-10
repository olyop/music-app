import React, { Fragment } from "react"

import Img from "../Img"
import DockLink from "../DocLink"
import DocLinks from "../DocLinks"
import { Link } from "react-router-dom"
import FeaturingArtists from "../FeaturingArtists"

import { isEmpty } from "lodash"
import { propTypes } from "./props" 
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc" 

import "./Song.scss"

const bem = reactBem("Song")

const Song = ({ song }) => {
  const { mix, artists, featuring, remixers, album } = song
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
          <DockLink
            doc={song}
            path="/song"
          />
          <span className={bem("info-mix")}>
            <Fragment> - </Fragment>
            {isEmpty(remixers) ? null : <Fragment>
              <Fragment>
                <DocLinks
                  path="/artist"
                  docs={remixers}
                  ampersand={true}
                />
              </Fragment>
              <Fragment>
                <Fragment> </Fragment>
                <Fragment>{mix}</Fragment>
                <Fragment> Remix</Fragment>
              </Fragment>
            </Fragment>}
          </span>
        </div>
        <div className={bem("info-album")}>
          <DockLink
            doc={album}
            path="/album"
          />
        </div>
        <div className={bem("info-artists")}>
          <FeaturingArtists
            artists={artists}
            featuring={featuring}
          />
        </div>
      </div>
    </div>
  )
}

Song.propTypes = propTypes

export default Song
