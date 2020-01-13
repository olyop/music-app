import React from "react"

import Img from "../Img"
import Icon from "../Icon"
import Play from "../Play"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import deserializeDate from "../../helpers/deserializeDate"
import { catalogUrl, showColumn } from "../../helpers/misc"
import deserializeDuration from "../../helpers/deserializeDuration"

import "./SongTable.scss"

const bem = reactBem("SongTable")

const SongTable = ({ song, className, columnsToIgnore }) => {

  const {
    title, trackNumber, mix, duration,
    featuring, remixers, artists, genres, album,
  } = song

  const show = showColumn(columnsToIgnore)

  // const [ mutateUserSongs ] = useMutation(ADD_USER_SONG)

  // const handleInLibraryClick = () => {
  //   mutateUserSongs({ variables: { userId, songId } })
  //   const userFrag = { songs: [song], __typename: "User" }
  //   const fragment = USER_SONG_FRAG
  //   client.writeFragment({ id: userId, data: userFrag, fragment })
  // }

  return (
    <tr className={bem({ ignore: true, className },"")}>

      {show("cover") ? (
        <td className={bem("cover","col")}>
          <Img
            url={catalogUrl(album.id)}
            className={bem("col-img")}
          />
          <Play
            song={song}
            className={bem("col-play")}
          />
        </td>
      ) : null}

      {show("play") ? (
        <td className={bem("cover","col")}>
          <Play
            song={song}
            className={bem("col-play-button")}
          />
        </td>
      ) : null}

      {show("trackNumber") ? (
        <td className={bem("track","col")}>
          <span className={bem("col-span")}>
            {trackNumber}
          </span>
        </td>
      ) : null}

      {show("title") ? (
        <td className={bem("title","col")}>
          <div className={bem("col-span")}>
            <SongTitle
              mix={mix}
              title={title}
              featuring={featuring}
            />
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

      {show("add") ? (
        <td className={bem("add","col")}>
          <Icon
            icon="add"
            // onClick={handleInLibraryClick}
            // icon={inLibrary ? "done" : "add"}
            className={bem("col-add-button")}
          />
        </td>
      ) : null}

      {show("duration") ? (
        <td className={bem("duration","col")}>
          <div className={bem("col-span")}>
            {deserializeDuration(duration)}
          </div>
        </td>
      ) : null}

      {show("artists") ? (
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

      {show("remixers") ? (
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

      {show("album") ? (
        <td className={bem("album","col")}>
          <div className={bem("col-span")}>
            <DocLink
              doc={album}
              path="/album"
            />
          </div>
        </td>
      ) : null}

      {show("genres") ? (
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

      {show("released") ? (
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
