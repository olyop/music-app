import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/User"
import SongsTable from "../SongsTable"

import { filter, map } from "lodash/fp"
import { pipe } from "../../helpers/misc"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_SONGS from "../../graphql/queries/getUserSongs.graphql"

const LibrarySongs = () => {
  const user = useContext(UserCtx)
  const variables = { id: user.id }
  const { loading, error, data } = useQuery(GET_USER_SONGS, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.songs)) {
    return <Empty/>
  } else {
    return (
      <SongsTable
        orderByInit={{ field: "title", order: true }}
        columnsToIgnore={["cover","trackNumber","released"]}
        songs={pipe(data.user.songs)(
          filter(({ inLibrary }) => inLibrary),
          map(({ song, numOfPlays }) => ({ ...song, numOfPlays })),
        )}
      />
    )
  }
}

export default LibrarySongs
