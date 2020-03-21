/* eslint-disable no-unused-vars */
import React, { useContext } from "react"

import Icon from "../Icon"
import UserCtx from "../../ctx/User"

import reactBem from "@oly_op/react-bem"
import { useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"
import { concat, includes, filter, uniqueId } from "lodash"
import determineReturnFromDoc from "./determineReturnFromDoc"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.graphql"
import ADD_USER_ALBUM from "../../graphql/mutations/addUserAlbum.graphql"
import ADD_USER_ARTIST from "../../graphql/mutations/addUserArtist.graphql"

import REMOVE_USER_SONG from "../../graphql/mutations/removeUserSong.graphql"
import REMOVE_USER_ALBUM from "../../graphql/mutations/removeUserAlbum.graphql"
import REMOVE_USER_ARTIST from "../../graphql/mutations/removeUserArtist.graphql"

import USER_SONGS_FRAG from "../../graphql/fragments/userSongsFrag.graphql"
import USER_ALBUMS_FRAG from "../../graphql/fragments/userAlbumsFrag.graphql"
import USER_ARTISTS_FRAG from "../../graphql/fragments/userArtistsFrag.graphql"

import "./AddToLibrary.scss"

const bem = reactBem("AddSongToLibrary")

const AddToLibrary = ({ doc, className }) => {

  const user = useContext(UserCtx)
  const determineReturn = determineReturnFromDoc(doc)

  const ADD_MUTATION = determineReturn(
    ADD_USER_SONG,
    ADD_USER_ALBUM,
    ADD_USER_ARTIST,
  )

  const REMOVE_MUTATION = determineReturn(
    REMOVE_USER_SONG,
    REMOVE_USER_ALBUM,
    REMOVE_USER_ARTIST,
  )

  const USER_FRAG = determineReturn(
    USER_SONGS_FRAG,
    USER_ALBUMS_FRAG,
    USER_ARTISTS_FRAG,
  )

  const key = determineReturn("songs","albums","artists")
  const userDocKey = determineReturn("song","album","artist")
  const variablesKey = determineReturn("songId","albumId","artistId")
  const mutationAddName = determineReturn("addUserSong","addUserAlbum","addUserArtist")
  const mutationRemoveName = determineReturn("removeUserSong","removeUserAlbum","removeUserArtist")

  const { id: docId } = doc
  const { id: userId, [key]: docs } = user
  const variables = { userId, [variablesKey]: docId }
  const inLibrary = includes(docs.map(({ [userDocKey]: { id } }) => id), docId)

  const optimisticResponse = mutationName => {
    let newDocs
    if (inLibrary) {
      newDocs = docs.filter(({ [userDocKey]: { id } }) => id !== docId)
    } else {
      newDocs = concat(docs, { id: uniqueId(), [userDocKey]: doc })
    }
    return {
      __typename: "Mutation",
      [mutationName]: {
        id: userId,
        [key]: newDocs,
        __typename: "User",
      },
    }
  }

  const update = (client, result) => {
    const { data } = result
    const mutationName = inLibrary ? mutationRemoveName : mutationAddName
    let newDocs
    if (inLibrary) {
      newDocs = docs.filter(({ [userDocKey]: { id } }) => id !== docId)
    } else {
      newDocs = concat(docs, data[mutationName][key])
    }
    client.writeFragment({
      id: userId,
      fragment: USER_FRAG,
      data: { [key]: newDocs, __typename: "User" },
    })
  }

  const [ addMutation ] = useMutation(
    ADD_MUTATION,
    { update,
      variables,
      optimisticResponse: optimisticResponse(mutationAddName) },
  )

  const [ removeMutation ] = useMutation(
    REMOVE_MUTATION,
    { update,
      variables,
      optimisticResponse: optimisticResponse(mutationRemoveName) },
  )

  const handleClick = () => {
    if (inLibrary) {
      removeMutation()
    } else addMutation()
  }

  return (
    <Icon
      onClick={handleClick}
      icon={inLibrary ? "done" : "add"}
      className={bem({ ignore: true, className }, "")}
    />
  )
}

AddToLibrary.propTypes = propTypes
AddToLibrary.defaultProps = defaultProps

export default AddToLibrary
