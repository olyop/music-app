import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/User"
import SongsTable from "../SongsTable"

import { isUndefined, isEmpty } from "lodash"
import { useQuery, useApolloClient } from "@apollo/react-hooks"

import GET_LIBRARY_SONGS from "../../graphql/queries/getLibrarySongs.graphql"
import LIBRARY_SONGS_FRAG from "../../graphql/fragments/librarySongsFrag.graphql"

const LibrarySongs = () => {
  const user = useContext(UserCtx)
  const client = useApolloClient()
  const { library } = user
  const { id } = library
  const query = GET_LIBRARY_SONGS
  const options = { variables: { id } }
  const { loading, error, data } = useQuery(query, options)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.library.songs)) {
    return <Empty/>
  } else {
    const { songs } = data.library
    const fragment = LIBRARY_SONGS_FRAG
    const userFrag = { songs, __typename: "Library" }
    client.writeFragment({ id, fragment, data: userFrag })
    return (
      <SongsTable
        songs={songs.map(({ song }) => song)}
        columnsToIgnore={["cover","trackNumber"]}
      />
    )
  }
}

export default LibrarySongs
