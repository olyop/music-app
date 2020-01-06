import React, { Fragment } from "react"

import Img from "../Img"
import DocLinks from "../DocLinks"
import { Link } from "react-router-dom"
import FeaturingArtists from "../FeaturingArtists"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"
import { propTypes, defaultProps } from "./props"

import "./Song.scss"

const bem = reactBem("Song")

const Song = ({ song, className }) => {
  const { title, mix, artists, featuring, remixers, album } = song
  return (
    <div className={bem({ ignore: true, className },"")}>
      <Link to={`/album/${album.id}`}>
        <Img
          className={bem("cover")}
          url={catalogUrl(album.id)}
          imgClassName={bem("cover-img")}
        />
      </Link>
      <div className={bem("text")}>
        <div className={bem("text-title")}>
          {title}
          {isEmpty(remixers) ? (
            <Fragment>
              {isEmpty(mix) ? null : (
                <span className={bem("text-mix")}>
                  <Fragment> - </Fragment>
                  {mix}
                  <Fragment> Mix</Fragment>
                </span>
              )}
            </Fragment>
          ) : (
            <span className={bem("text-mix")}>
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
          )}
        </div>
        <div className={bem("text-artists")}>
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
Song.defaultProps = defaultProps

export default Song
