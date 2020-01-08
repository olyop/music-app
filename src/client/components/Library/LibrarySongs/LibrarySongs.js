import React, { useContext } from "react"

import Empty from "../../Empty"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import UserCtx from "../../../ctx/user"
import SongTable from "../../SongTable"
import SongsTable from "../../SongsTable"

import gql from "graphql-tag"
import { isUndefined, isEmpty } from "lodash"
import GET_USER_SONGS from "./getUserSongs.graphql"
import { useQuery, useApolloClient } from "@apollo/react-hooks"

const LibrarySongs = () => {
  const client = useApolloClient()
  const { user } = useContext(UserCtx)
  const { id } = user
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_USER_SONGS, queryOptions)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.songs)) {
    return <Empty/>
  } else {
    const { songs } = data.user
    client.writeFragment({
      id,
      data: { ...user, songs },
      fragment: gql`fragment addUserSong on User { songs }`,
    })
    const columnsToIgnore = ["cover","play","trackNumber"]
    return (
      <SongsTable columnsToIgnore={columnsToIgnore}>
        {songs.map(
          song => (
            <SongTable
              song={song}
              key={song.id}
              columnsToIgnore={columnsToIgnore}
            />
          )
        )}
      </SongsTable>
    )
  }
}

export default LibrarySongs
