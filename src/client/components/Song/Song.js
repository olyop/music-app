import React from "react"

import FeaturingArtists from "../FeaturingArtists"
import DocLinks from "../DocLinks"
import DocLink from "../DocLink"
import Icon from "../Icon"
import Img from "../Img"

import { deserializeDate, deserializeDuration, catalogUrl } from "../../helpers/misc"
import { string, number, arrayOf, object, shape } from "prop-types"
import reactBem from "@oly_op/react-bem"
import { isEmpty } from "lodash"

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

Song.propTypes = {
  song: shape({
    id: string.isRequired,
    mix: string.isRequired,
    title: string.isRequired,
    duration: number.isRequired,
    album: shape({
      id: string.isRequired,
      released: number.isRequired
    }).isRequired,
    genres: arrayOf(object).isRequired,
    artists: arrayOf(object).isRequired,
    remixers: arrayOf(object).isRequired,
    featuring: arrayOf(object).isRequired
  }).isRequired
}

export default Song
