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
          {isEmpty(remixers) ? null : <Fragment>
            <span className={bem("info-mix")}>
              <Fragment> - </Fragment>
              <Fragment>
                <DocLinks
                  path="/artist"
                  docs={remixers}
                  ampersand={true}
                />
              </Fragment>
              <Fragment>
                <Fragment> </Fragment>
                {mix}
                <Fragment> Remix</Fragment>
              </Fragment>
            </span>
          </Fragment>}
        </div>
        <div className={bem("info-artists")}>
          <FeaturingArtists
            artists={artists}
            featuring={featuring}
          />
        </div>
        <div className={bem("info-progress")}/>
      </div>
    </div>
  )
}

Song.propTypes = propTypes

export default Song