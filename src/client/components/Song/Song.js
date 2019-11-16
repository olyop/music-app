import React from "react"

import FeaturingArtists from "../FeaturingArtists"
import DocLinks from "../DocLinks"
import DocLink from "../DocLink"
import Icon from "../Icon"
import Img from "../Img"

import { deserializeDate, deserializeDuration } from "../../helpers/misc"
import { string, number, arrayOf, object } from "prop-types"
import reactBem from "@oly_op/react-bem"
import { isEmpty } from "lodash"

import "./Song.scss"

const bem = reactBem("Song")

const Song = ({
  id, mix, title, albumCoverUrl, duration, artists, featuring, remixers, released, genres
}) => (
  <tr className={bem("")}>
    <td className={bem("tableCol","tableHeadCover")}>
      <Img
        url={albumCoverUrl}
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
          path="/song"
          doc={{ id, title }}
        />
        <span className={bem("mix")}>{isEmpty(mix) ? "" : ` - ${mix} Mix`}</span>
      </div>
    </td>
    <td className={bem("tableCol","duration")}>
      <span className={bem("tableColSpan")}>{deserializeDuration(duration)}</span>
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
      <span className={bem("tableColSpan")}>{deserializeDate(released)}</span>
    </td>
  </tr>
)

Song.propTypes = {
  id: string.isRequired,
  mix: string.isRequired,
  title: string.isRequired,
  duration: number.isRequired,
  genres: arrayOf(object),
  remixers: arrayOf(object),
  featuring: arrayOf(object),
  released: number.isRequired,
  albumCoverUrl: string.isRequired,
  artists: arrayOf(object).isRequired
}

Song.defaultProps = {
  featuring: [],
  remixers: [],
  genres: []
}

export default Song
