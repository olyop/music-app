import React, { useContext, Fragment } from "react"

import Img from "../Img"
import Icon from "../Icon"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import UserCtx from "../../ctx/user"

import reactBem from "@oly_op/react-bem"
import { isEmpty, includes } from "lodash"
import { catalogUrl } from "../../helpers/misc"
import { propTypes, defaultProps } from "./props"
import deserializeDate from "../../helpers/deserializeDate"
import deserializeDuration from "../../helpers/deserializeDuration"

import "./SongTable.scss"

const bem = reactBem("SongTable")

const SongTable = ({ song, className, columnsToIgnore }) => {
  const { handleNowPlaying } = useContext(UserCtx)
  const showColumn = name => !includes(columnsToIgnore, name)
  const { title, trackNumber, mix, duration, featuring, remixers, artists, genres, album } = song
  const handlePlayClick = () => handleNowPlaying(song)
  return (
    <tr className={bem({ ignore: true, className },"")}>

      {showColumn("cover") ? (
        <td className={bem("cover","col")}>
          <Img
            url={catalogUrl(album.id)}
            className={bem("col-img")}
          />
          <Icon
            icon="play_arrow"
            onClick={handlePlayClick}
            className={bem("col-play")}
          />
        </td>
      ) : null}

      {showColumn("play") ? (
        <td className={bem("cover","col")}>
          <Icon
            icon="play_arrow"
            onClick={handlePlayClick}
            className={bem("col-play-button")}
          />
        </td>
      ) : null}

      {showColumn("trackNumber") ? (
        <td className={bem("track","col")}>
          <span className={bem("col-span")}>
            {trackNumber}
          </span>
        </td>
      ) : null}

      {showColumn("title") ? (
        <td className={bem("title","col")}>
          <div className={bem("col-span")}>
            {title}
            {isEmpty(featuring) ? null : (
              <Fragment>
                <Fragment> (feat. </Fragment>
                <DocLinks
                  path="/artist"
                  docs={featuring}
                  ampersand={true}
                />
                <Fragment>)</Fragment>
              </Fragment>
            )}
            <span className={bem("col-span-mix")}>
              {isEmpty(mix) ? "" : ` - ${mix} Mix`}
            </span>
          </div>
          <div className={bem("artists-under","col-span")}>
            <DocLinks
              path="/artist"
              docs={artists}
              ampersand={false}
            />
          </div>
        </td>
      ) : null}

      {showColumn("duration") ? (
        <td className={bem("duration","col")}>
          <div className={bem("col-span")}>
            {deserializeDuration(duration)}
          </div>
        </td>
      ) : null}

      {showColumn("artists") ? (
        <td className={bem("artists","col")}>
          <div className={bem("col-span")}>
            <DocLinks
              path="/artist"
              docs={artists}
              ampersand={false}
            />
          </div>
        </td>
      ) : null}

      {showColumn("remixers") ? (
        <td className={bem("remixers","col")}>
          <div className={bem("col-span")}>
            {isEmpty(remixers) ? null : (
              <DocLinks
                path="/artist"
                docs={remixers}
                ampersand={false}
              />
            )}
          </div>
        </td>
      ) : null}

      {showColumn("album") ? (
        <td className={bem("album","col")}>
          <div className={bem("col-span")}>
            <DocLink
              doc={album}
              path="/album"
            />
          </div>
        </td>
      ) : null}

      {showColumn("genres") ? (
        <td className={bem("genres","col")}>
          <div className={bem("col-span")}>
            <DocLinks
              path="/genre"
              docs={genres}
              ampersand={false}
            />
          </div>
        </td>
      ) : null}

      {showColumn("released") ? (
        <td className={bem("released","col")}>
          <div className={bem("col-span")}>
            {deserializeDate(album.released)}
          </div>
        </td>
      ) : null}

    </tr>
  )
}

SongTable.propTypes = propTypes
SongTable.defaultProps = defaultProps

export default SongTable
