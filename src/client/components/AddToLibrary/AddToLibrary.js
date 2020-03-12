/* eslint-disable no-unused-vars */
import React, { useContext } from "react"

import Icon from "../Icon"
import UserCtx from "../../ctx/User"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { concat, includes, filter, uniqueId } from "lodash"
import { useMutation, useApolloClient } from "@apollo/react-hooks"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.graphql"
import ADD_USER_ALBUM from "../../graphql/mutations/addUserAlbum.graphql"
import ADD_USER_ARTIST from "../../graphql/mutations/addUserArtist.graphql"

import USER_SONGS_FRAG from "../../graphql/fragments/userSongsFrag.graphql"
import USER_ALBUMS_FRAG from "../../graphql/fragments/userAlbumsFrag.graphql"
import USER_ARTISTS_FRAG from "../../graphql/fragments/userArtistsFrag.graphql"

import REMOVE_USER_SONG from "../../graphql/mutations/removeUserSong.graphql"
import REMOVE_USER_ALBUM from "../../graphql/mutations/removeUserAlbum.graphql"
import REMOVE_USER_ARTIST from "../../graphql/mutations/removeUserArtist.graphql"

import "./AddToLibrary.scss"

const bem = reactBem("AddSongToLibrary")

const AddToLibrary = ({ doc, className }) => {

  const user = useContext(UserCtx)
  const client = useApolloClient()
  
  const [ addUserSong ] = useMutation(ADD_USER_SONG)
  const [ addUserAlbum ] = useMutation(ADD_USER_ALBUM)
  const [ addUserArtist ] = useMutation(ADD_USER_ARTIST)

  const [ removeUserSong ] = useMutation(REMOVE_USER_SONG)
  const [ removeUserAlbum ] = useMutation(REMOVE_USER_ALBUM)
  const [ removeUserArtist ] = useMutation(REMOVE_USER_ARTIST)

  const determineReturn = ({ __typename }) => ({ song, album, artist }) => {
    if (__typename === "Song") return song
    else if (__typename === "Album") return album
    else return artist
  }

  const key = determineReturn(doc)({
    song: "songs",
    album: "albums",
    artist: "artists",
  })

  const userDocKey = determineReturn(doc)({
    song: "song",
    album: "album",
    artist: "artist",
  })

  const variablesKey = determineReturn(doc)({
    song: "songId",
    album: "albumId",
    artist: "artistId",
  })

  const fragment = determineReturn(doc)({
    song: USER_SONGS_FRAG,
    album: USER_ALBUMS_FRAG,
    artist: USER_ARTISTS_FRAG,
  })

  const addMutation = determineReturn(doc)({
    song: addUserSong,
    album: addUserAlbum,
    artist: addUserArtist,
  })

  const removeMutation = determineReturn(doc)({
    song: removeUserSong,
    album: removeUserAlbum,
    artist: removeUserArtist,
  })
  
  const { id: docId } = doc
  const { id: userId, [key]: docs } = user
  const variables = { userId, [variablesKey]: docId }
  const inLibrary = includes(docs.map(({ [userDocKey]: { id } }) => id), docId)
  const icon = inLibrary ? "done" : "add"

  const determineNewDocs = () => {
    if (inLibrary) {
      removeMutation({ variables })
      const docFilter = ({ [userDocKey]: { id } }) => id !== docId
      return filter(docs, docFilter)
    } else {
      addMutation({ variables })
      const newDoc = { id: uniqueId(), [userDocKey]: doc }
      return concat(docs, newDoc)
    }
  }

  const handleClick = () => {
    const newDocs = determineNewDocs()
    const userFrag = { [key]: newDocs, __typename: "User" }
    client.writeFragment({ id: userId, fragment, data: userFrag })
  }

  return (
    <Icon
      icon={icon}
      onClick={handleClick}
      className={bem({ ignore: true, className }, "")}
    />
  )
}

AddToLibrary.propTypes = propTypes
AddToLibrary.defaultProps = defaultProps

export default AddToLibrary
