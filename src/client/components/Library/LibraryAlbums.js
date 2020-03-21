import React, { useContext } from "react"

import Empty from "../Empty"
import Album from "../Album"
import Albums from "../Albums"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/User"

import { isUndefined, isEmpty } from "lodash"
import { useQuery, useApolloClient } from "@apollo/react-hooks"

import GET_USER_ALBUMS from "../../graphql/queries/getUserAlbums.graphql"
import USER_ALBUMS_FRAG from "../../graphql/fragments/userAlbumsFrag.graphql"

const LibraryAlbums = () => {
  const user = useContext(UserCtx)
  const client = useApolloClient()

  const { id } = user
  const query = GET_USER_ALBUMS
  const variables = { id }
  const { loading, error, data } = useQuery(query, { variables })

  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.albums)) {
    return <Empty/>
  } else {
    const { albums } = data.user
    const fragment = USER_ALBUMS_FRAG
    const userFrag = { albums, __typename: "User" }
    client.writeFragment({ id, fragment, data: userFrag })
    return (
      <Albums>
        {albums.map(
          ({ album }) => (
            <Album
              album={album}
              key={album.id}
            />
          ),
        )}
      </Albums>
    )
  }
}

export default LibraryAlbums
