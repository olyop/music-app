import React, { useContext } from "react"

import Empty from "../../Empty"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import UserCtx from "../../../ctx/user"
import SongTable from "../../SongTable"
import SongsTable from "../../SongsTable"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import GET_USER_SONGS from "./getUserSongs.graphql"

const LibrarySongs = () => {
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
    const columnsToIgnore = ["cover","play","trackNumber"]
    return (
      <SongsTable columnsToIgnore={columnsToIgnore}>
        {songs.map(
          song => (
            <SongTable
              song={song}
              key={song.id}
              inLibrary={true}
              columnsToIgnore={columnsToIgnore}
            />
          )
        )}
      </SongsTable>
    )
  }
}

export default LibrarySongs
