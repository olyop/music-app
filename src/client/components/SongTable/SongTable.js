import React, { useContext } from "react"

import Img from "../Img"
import Icon from "../Icon"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import UserCtx from "../../ctx/user"
import SongTitle from "../SongTitle"

import gql from "graphql-tag"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"
import { useApolloClient, useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"
import { isEmpty, includes, concat } from "lodash"
import deserializeDate from "../../helpers/deserializeDate"
import deserializeDuration from "../../helpers/deserializeDuration"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.graphql"
import NOW_PLAYING_FRAG from "../../graphql/fragments/nowPlayingFrag.graphql"
import UPDATE_NOW_PLAYING from "../../graphql/mutations/updateNowPlaying.graphql"

import "./SongTable.scss"

const addUserSong = gql`fragment addUserSong on User { songs }`

const bem = reactBem("SongTable")

const SongTable = ({ song, className, columnsToIgnore }) => {
  const client = useApolloClient()
  const { user } = useContext(UserCtx)
  const { id: userId } = user

  const [ mutateUserSongs ] = useMutation(ADD_USER_SONG)
  const [ mutateNowPlaying ] = useMutation(UPDATE_NOW_PLAYING)

  const {
    id: songId, title, trackNumber, mix, duration,
    featuring, remixers, artists, genres, album,
  } = song

  const showColumn = name => !includes(columnsToIgnore, name)

  const handlePlayClick = () => {
    mutateNowPlaying({ variables: { userId, songId } })
    const fragment = NOW_PLAYING_FRAG
    const newUser = { nowPlaying: song, __typename: "User" }
    client.writeFragment({ id: userId, fragment, data: newUser })
  }

  const handleInLibraryClick = () => {
    mutateUserSongs({ variables: { userId, songId } })
    const newSongs = concat(user.songs, { ...song, __typename: "Song" })
    client.writeFragment({
      id: userId,
      data: { songs: newSongs, __typename: "User" },
      fragment: addUserSong,
    })
  }

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

      {showColumn("add") ? (
        <td className={bem("add","col")}>
          <Icon
            icon="add"
            onClick={handleInLibraryClick}
            // icon={inLibrary ? "done" : "add"}
            className={bem("col-add-button")}
          />
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
