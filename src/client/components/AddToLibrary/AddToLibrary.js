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
import USER_SONGS_FRAG from "../../graphql/fragments/userSongsFrag.graphql"
import USER_ALBUMS_FRAG from "../../graphql/fragments/userAlbumsFrag.graphql"
import REMOVE_USER_SONG from "../../graphql/mutations/removeUserSong.graphql"
import REMOVE_USER_ALBUM from "../../graphql/mutations/removeUserAlbum.graphql"

import "./AddToLibrary.scss"

const bem = reactBem("AddSongToLibrary")

const AddToLibrary = ({ doc, className }) => {
  const user = useContext(UserCtx)
  const client = useApolloClient()
  
  const [ addUserSong ] = useMutation(ADD_USER_SONG)
  const [ addUserAlbum] = useMutation(ADD_USER_ALBUM)
  const [ removeUserSong ] = useMutation(REMOVE_USER_SONG)
  const [ removeUserAlbum ] = useMutation(REMOVE_USER_ALBUM)

  const isSong = doc.__typename === "Song"
  const key = isSong ? "songs" : "albums"
  const userDocKey = isSong ? "song" : "album"
  const variablesKey = isSong ? "songId" : "albumId"
  const fragment = isSong ? USER_SONGS_FRAG : USER_ALBUMS_FRAG
  
  const { id: docId } = doc
  const { id: userId, [key]: docs } = user
  const variables = { userId, [variablesKey]: docId }
  const inLibrary = includes(docs.map(({ song }) => song.id), docId)
  const icon = inLibrary ? "done" : "add"

  const handleClick = () => {
    let newDocs
    if (inLibrary) {
      if (isSong) removeUserSong({ variables })
      else removeUserAlbum({ variables })
      newDocs = filter(docs, ({ song }) => song.id !== docId)
    } else {
      if (isSong) addUserSong({ variables })
      else addUserAlbum({ variables })
      const newDoc = { id: uniqueId(), [userDocKey]: doc }
      newDocs = concat(docs, newDoc)
    }
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
