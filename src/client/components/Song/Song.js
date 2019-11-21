import React from "react"

import Img from "../Img"
import Icon from "../Icon"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import FeaturingArtists from "../FeaturingArtists"

import { isEmpty } from "lodash"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { deserializeDate, deserializeDuration, catalogUrl } from "../../helpers/misc"

import "./Song.scss"

const bem = reactBem("Song")

const Song = ({ song }) => {
  const { mix, duration, featuring, remixers, artists, genres, album } = song
  return (
    <tr className={bem("")}>
      <td className={bem("tableCol","tableHeadCover")}>
        <Img
          url={catalogUrl(album.id)}
          className={bem("albumCover")}
        />
        <Icon
          icon="play_arrow"
          className={bem("playIcon")}
        />
      </td>
      <td className={bem("tableCol")}>
        <div className={bem("tableColSpan")}>
          <DocLink
            doc={song}
            path="/song"
          />
          <span className={bem("mix")}>
            {isEmpty(mix) ? "" : ` - ${mix} Mix`}
          </span>
        </div>
      </td>
      <td className={bem("tableCol","duration")}>
        <span className={bem("tableColSpan")}>
          {deserializeDuration(duration)}
        </span>
      </td>
      <td className={bem("tableCol")}>
        <span className={bem("tableColSpan")}>
          <FeaturingArtists
            artists={artists}
            featuring={featuring}
          />
        </span>
      </td>
      <td className={bem("tableCol")}>
        <span className={bem("tableColSpan")}>
          {isEmpty(remixers) ? null : (
            <DocLinks
              path="/artist"
              docs={remixers}
            />
          )}
        </span>
      </td>
      <td className={bem("tableCol")}>
        <span className={bem("tableColSpan")}>
          <DocLinks
            path="/genre"
            docs={genres}
          />
        </span>
      </td>
      <td className={bem("tableCol")}>
        <span className={bem("tableColSpan")}>
          {deserializeDate(album.released)}
        </span>
      </td>
    </tr>
  )
}

Song.propTypes = propTypes

export default Song
