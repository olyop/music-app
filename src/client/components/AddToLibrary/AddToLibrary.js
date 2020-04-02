import React, { useContext } from "react"

import Icon from "../Icon"
import UserContext from "../../contexts/User"

import { includes, find } from "lodash"
import { propTypes, defaultProps } from "./props"
import { determineReturnFromDoc } from "../../helpers"
import { useApolloClient, useMutation } from "@apollo/react-hooks"

import ADD_USER_SONG from "../../graphql/mutations/addUserSong.graphql"
import ADD_USER_ALBUM from "../../graphql/mutations/addUserAlbum.graphql"
import ADD_USER_ARTIST from "../../graphql/mutations/addUserArtist.graphql"

import USER_SONGS_FRAG from "../../graphql/fragments/userSongsFrag.graphql"
import USER_ALBUMS_FRAG from "../../graphql/fragments/userAlbumsFrag.graphql"
import USER_ARTISTS_FRAG from "../../graphql/fragments/userArtistsFrag.graphql"
import USER_LIBRARY_FRAG from "../../graphql/fragments/userLibraryFrag.graphql"

import REMOVE_USER_SONG from "../../graphql/mutations/removeUserSong.graphql"
import REMOVE_USER_ALBUM from "../../graphql/mutations/removeUserAlbum.graphql"
import REMOVE_USER_ARTIST from "../../graphql/mutations/removeUserArtist.graphql"

const AddToLibrary = ({ doc, className }) => {

  const client = useApolloClient()
  const id = useContext(UserContext)
  const user = client.readFragment({ id, fragment: USER_LIBRARY_FRAG })

  const determineReturn = determineReturnFromDoc(doc)

  const key = determineReturn("songs","albums","artists")
  const userDocKey = determineReturn("song","album","artist")
  const variablesKey = determineReturn("songId","albumId","artistId")
  const docTypeName = determineReturn("UserSong","UserAlbum","UserArtist")
  const mutationAddName = determineReturn("addUserSong","addUserAlbum","addUserArtist")
  const mutationRemoveName = determineReturn("removeUserSong","removeUserAlbum","removeUserArtist")

  const { id: docId } = doc
  const { [key]: docs } = user
  const variables = { userId: id, [variablesKey]: docId }

  const inLibrary =
    includes(docs.map(userDoc => userDoc.id), -1) ||
    includes(docs.map(({ [userDocKey]: userDoc }) => userDoc.id), docId)

  const userDocId = inLibrary ? find(docs, ({ [userDocKey]: userDoc }) => userDoc.id === docId).id : -1
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
      dateCreated: 0,
      [userDocKey]: doc,
      inLibrary: !inLibrary,
      __typename: docTypeName,
    },
  }

  const update = (proxy, result) => {
    const { [key]: tempDocs } = proxy.readFragment({
      id,
      fragment: USER_LIBRARY_FRAG,
    })

    const newDocs = inLibrary ?
      tempDocs.filter(({ [userDocKey]: userDoc }) => userDoc.id !== docId) :
      tempDocs.concat(result.data[mutationName])

    proxy.writeFragment({
      id,
      fragment: USER_FRAG,
      data: { [key]: newDocs, __typename: "User" },
    })
  }

  const [ mutation ] = useMutation(
    MUTATION,
    { variables, update, optimisticResponse },
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
