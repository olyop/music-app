import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/User"
import SongsTable from "../SongsTable"

import { filter, map } from "lodash/fp"
import { pipe } from "../../helpers/misc"
import { isUndefined, isEmpty } from "lodash"
import { useQuery, useApolloClient } from "@apollo/react-hooks"

import GET_USER_SONGS from "../../graphql/queries/getUserSongs.graphql"
import USER_SONGS_FRAG from "../../graphql/fragments/userSongsFrag.graphql"

const LibrarySongs = () => {
  const user = useContext(UserCtx)
  const client = useApolloClient()

  const { id } = user
  const query = GET_USER_SONGS
  const options = { variables: { id } }
  const { loading, error, data } = useQuery(query, options)

  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.songs)) {
    return <Empty/>
  } else {
    const { songs } = data.user
    const fragment = USER_SONGS_FRAG
    const userFrag = { songs, __typename: "User" }
    client.writeFragment({ id, fragment, data: userFrag })
    return (
      <SongsTable
        orderByInit={{ field: "title", order: true }}
        columnsToIgnore={["cover","trackNumber","released"]}
        songs={pipe(songs)(
          filter(({ inLibrary }) => inLibrary),
          map(({ song, numOfPlays }) => ({ ...song, numOfPlays })),
        )}
      />
    )
  }
}

export default LibrarySongs
