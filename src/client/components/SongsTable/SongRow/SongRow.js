import React from "react"

import Img from "../../Img"
import Song from "../../Song"
import DocLink from "../../DocLink"
import DocLinks from "../../DocLinks"
import SongTitle from "../../SongTitle"
import PlayButton from "../../PlayButton"
import AddToLibrary from "../../AddToLibrary"

import reactBem from "@oly_op/react-bem"
import { isEmpty, concat } from "lodash"
import { propTypes, defaultProps } from "./props"
import { catalogUrl, show } from "../../../helpers/misc"
import deserializeDate from "../../../helpers/deserializeDate"
import deserializeDuration from "../../../helpers/deserializeDuration"

import "./SongRow.scss"

const bem = reactBem("SongRow")

const SongRow = ({ song, className, columnsToIgnore }) => {

  const {
    title, trackNumber, mix, duration,
    featuring, remixers, artists, genres, album,
  } = song

  const showColumn = show(columnsToIgnore)

  return (
    <tr className={bem({ ignore: true, className },"")}>

      {showColumn("cover") ? (
        <td className={bem("cover","col")}>
          <Img
            url={catalogUrl(album.id)}
            className={bem("col-img")}
            children={(
              <PlayButton
                song={song}
                className={bem("col-img-play")}
              />
            )}
          />
        </td>
      ) : null}

      {showColumn("play") ? (
        <td className={bem("play","col")}>
          <PlayButton
            song={song}
            className={bem("play-icon")}
          />
        </td>
      ) : null}

      {showColumn("trackNumber") ? (
        <td className={bem("trackNumber","col")}>
          <span className={bem("trackNumber-span","col-span")}>{trackNumber}</span>
        </td>
      ) : null}

      {showColumn("title") ? (
        <td className={bem("title","col")}>
          <div className={bem("title-span","col-span")}>
            <SongTitle
              mix={mix}
              title={title}
            />
          </div>
          <Song
            song={song}
            showCover={false}
            className={bem("title-song","col-span")}
          />
        </td>
      ) : null}

      {showColumn("add") ? (
        <td className={bem("add","col")}>
          <AddToLibrary
            doc={song}
            className={bem("add-icon")}
          />
        </td>
      ) : null}

      {showColumn("duration") ? (
        <td className={bem("duration","col")}>
          <span className={bem("duration-span","col-span")}>
            {deserializeDuration(duration)}
          </span>
        </td>
      ) : null}

      {showColumn("artists") ? (
        <td className={bem("artists","col")}>
          <span className={bem("col-span")}>
            <DocLinks
              path="/artist"
              ampersand={false}
              docs={concat(artists,featuring)}
            />
          </span>
        </td>
      ) : null}

      {showColumn("remixers") ? (
        <td className={bem("remixers","col")}>
          <span className={bem("col-span")}>
            {isEmpty(remixers) ? null : (
              <DocLinks
                path="/artist"
                docs={remixers}
                ampersand={false}
              />
            )}
          </span>
        </td>
      ) : null}

      {showColumn("album") ? (
        <td className={bem("album","col")}>
          <span className={bem("col-span")}>
            <DocLink
              doc={album}
              path="/album"
            />
          </span>
        </td>
      ) : null}

      {showColumn("genres") ? (
        <td className={bem("genres","col")}>
          <span className={bem("col-span")}>
            <DocLinks
              path="/genre"
              docs={genres}
              ampersand={false}
            />
          </span>
        </td>
      ) : null}

      {showColumn("released") ? (
        <td className={bem("released","col")}>
          <span className={bem("col-span")}>
            {deserializeDate(album.released)}
          </span>
        </td>
      ) : null}

    </tr>
  )
}

SongRow.propTypes = propTypes
SongRow.defaultProps = defaultProps

export default SongRow
