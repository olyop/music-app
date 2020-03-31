import React from "react"

import Icon from "../Icon"

import { USER_ID } from "../../globals"
import { propTypes, defaultProps } from "./props"
import { includes, find, uniqueId } from "lodash"
import { determineReturnFromDoc } from "../../helpers"
import { useApolloClient, useMutation } from "@apollo/react-hooks"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.graphql"
import ADD_USER_ALBUM from "../../graphql/mutations/addUserAlbum.graphql"
import ADD_USER_ARTIST from "../../graphql/mutations/addUserArtist.graphql"

import USER_SONGS_FRAG from "../../graphql/fragments/userSongsFrag.graphql"
import USER_ALBUMS_FRAG from "../../graphql/fragments/userAlbumsFrag.graphql"
import USER_ARTISTS_FRAG from "../../graphql/fragments/userArtistsFrag.graphql"

import REMOVE_USER_SONG from "../../graphql/mutations/removeUserSong.graphql"
import REMOVE_USER_ALBUM from "../../graphql/mutations/removeUserAlbum.graphql"
import REMOVE_USER_ARTIST from "../../graphql/mutations/removeUserArtist.graphql"

import GET_USER_QUEUES_CLIENT from "../../graphql/queries/getUserQueues.graphql"

const AddToLibrary = ({ doc, className }) => {

  const client = useApolloClient()

  const user = client.readQuery({
    variables: { id: USER_ID },
    query: GET_USER_QUEUES_CLIENT,
  })

  const determineReturn = determineReturnFromDoc(doc)

  const key = determineReturn("songs","albums","artists")
  const userDocKey = determineReturn("song","album","artist")
  const variablesKey = determineReturn("songId","albumId","artistId")
  const docTypeName = determineReturn("UserSong","UserAlbum","UserArtist")
  const mutationAddName = determineReturn("addUserSong","addUserAlbum","addUserArtist")
  const mutationRemoveName = determineReturn("removeUserSong","removeUserAlbum","removeUserArtist")

  const { id: docId } = doc
  const { id: userId, [key]: docs } = user
  const variables = { userId, [variablesKey]: docId }
  const inLibrary = includes(docs.map(({ [userDocKey]: { id } }) => id), docId)
  const userDocId = inLibrary ? find(docs, ({ [userDocKey]: { id } }) => id === docId).id : uniqueId()
  const mutationName = inLibrary ? mutationRemoveName : mutationAddName

  const MUTATION = inLibrary ? determineReturn(
    REMOVE_USER_SONG,
    REMOVE_USER_ALBUM,
    REMOVE_USER_ARTIST,
  ) : determineReturn(
    ADD_USER_SONG,
    ADD_USER_ALBUM,
    ADD_USER_ARTIST,
  )

  const USER_FRAG = determineReturn(
    USER_SONGS_FRAG,
    USER_ALBUMS_FRAG,
    USER_ARTISTS_FRAG,
  )

  const optimisticResponse = {
    [mutationName]: {
      id: userDocId,
      numOfPlays: 0,
      [userDocKey]: doc,
      inLibrary: !inLibrary,
      __typename: docTypeName,
      dateCreated: Math.floor(Date.now() / 1000),
    },
  }

  const update = (_, result) => {
    const newDocs = inLibrary ?
      docs.filter(({ [userDocKey]: { id } }) => id !== docId) :
      docs.concat(result.data[mutationName])
    client.writeFragment({
      id: userId,
      fragment: USER_FRAG,
      data: { [key]: newDocs, __typename: "User" },
    })
  }

  const [ mutation ] = useMutation(
    MUTATION,
    { update, variables, optimisticResponse },
  )

  const handleClick = () => mutation()

  return (
    <Icon
      onClick={handleClick}
      className={className}
      icon={inLibrary ? "done" : "add"}
    />
  )
}

AddToLibrary.propTypes = propTypes
AddToLibrary.defaultProps = defaultProps

export default AddToLibrary
