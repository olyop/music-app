import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import Playlist from "../Playlist"
import Playlists from "../Playlists"
import UserCtx from "../../ctx/User"

import { isUndefined, isEmpty } from "lodash"
import { useQuery, useApolloClient } from "@apollo/react-hooks"

import GET_USER_PLAYLISTS from "../../graphql/queries/getUserPlaylists.graphql"
import USER_PLAYLISTS_FRAG from "../../graphql/fragments/userPlaylistsFrag.graphql"

const LibraryPlaylists = () => {
  const user = useContext(UserCtx)
  const client = useApolloClient()
  const { id } = user
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_USER_PLAYLISTS, queryOptions)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.playlists)) {
    return <Empty/>
  } else {
    const { playlists } = data.user
    const fragment = USER_PLAYLISTS_FRAG
    const userFrag = { playlists, __typename: "User" }
    client.writeFragment({ id, fragment, data: userFrag })
    return (
      <Playlists>
        {playlists.map(
          playlist => (
            <Playlist
              key={playlist.id}
              playlist={playlist}
            />
          )
        )}
      </Playlists>
    )
  }
}

export default LibraryPlaylists
