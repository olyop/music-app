import React, { Fragment } from "react"

import Img from "../Img"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import { Link } from "react-router-dom"
import FeaturingArtists from "../FeaturingArtists"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"
import { propTypes, defaultProps } from "./props"

import "./Song.scss"

const bem = reactBem("Song")

const Song = ({ song, showCover, className }) => {
  const { mix, artists, featuring, remixers, album } = song
  return (
    <div className={bem({ ignore: true, className },"")}>
      {showCover ? (
        <Link to={`/album/${album.id}`} title={album.title}>
          <Img
            className={bem("cover")}
            url={catalogUrl(album.id)}
            imgClassName={bem("cover-img")}
          />
        </Link>
      ) : null}
      <div className={bem("text")}>
        <p className={bem("text-title")}>
          <DocLink
            doc={song}
            path="/song"
          />
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
