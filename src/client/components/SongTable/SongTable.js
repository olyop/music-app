import React, { Fragment } from "react"

import Img from "../Img"
import Icon from "../Icon"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"

import { isEmpty } from "lodash"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"
import deserializeDate from "../../helpers/deserializeDate"
import deserializeDuration from "../../helpers/deserializeDuration"

import "./SongTable.scss"

const bem = reactBem("SongTable")

const SongTable = ({ song }) => {
  const { mix, duration, featuring, remixers, artists, genres, album } = song
  return (
    <tr className={bem("")}>
      <td className={bem("col-album","tableCol","tableHeadCover")}>
        <Img
          url={catalogUrl(album.id)}
          className={bem("albumCover")}
        />
        <Icon
          icon="play_arrow"
          className={bem("playIcon")}
        />
      </td>
      <td className={bem("col-title","tableCol")}>
        <div className={bem("tableColSpan")}>
          <DocLink
            doc={song}
            path="/song"
          />
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
          <span className={bem("mix")}>
            {isEmpty(mix) ? "" : ` - ${mix} Mix`}
          </span>
        </div>
      </td>
      <td className={bem("col-duration","tableCol","duration")}>
        <span className={bem("tableColSpan")}>
          {deserializeDuration(duration)}
        </span>
      </td>
      <td className={bem("col-artists","tableCol")}>
        <span className={bem("tableColSpan")}>
          <DocLinks
            path="/artist"
            docs={artists}
            ampersand={false}
          />
        </span>
      </td>
      <td className={bem("col-remixers","tableCol")}>
        <span className={bem("tableColSpan")}>
          {isEmpty(remixers) ? null : (
            <DocLinks
              path="/artist"
              docs={remixers}
              ampersand={false}
            />
          )}
        </span>
      </td>
      <td className={bem("col-album","tableCol")}>
        <span className={bem("tableColSpan")}>
          <DocLink
            doc={album}
            path="/album"
          />
        </span>
      </td>
      <td className={bem("col-genres","tableCol")}>
        <span className={bem("tableColSpan")}>
          <DocLinks
            path="/genre"
            docs={genres}
            ampersand={false}
          />
        </span>
      </td>
      <td className={bem("col-genres","tableCol")}>
        <span className={bem("tableColSpan")}>
          {deserializeDate(album.released)}
        </span>
      </td>
    </tr>
  )
}

SongTable.propTypes = propTypes

export default SongTable
