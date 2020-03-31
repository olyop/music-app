import React, { Fragment } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import SongsTable from "../SongsTable"
import { Link } from "react-router-dom"

import { pipe } from "../../helpers"
import { USER_ID } from "../../globals"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { filter, map, orderBy } from "lodash/fp"

import GET_USER_SONGS from "../../graphql/queries/getUserSongs.graphql"

const LibrarySongs = () => {
  const variables = { id: USER_ID }
  const { data, loading, error } = useQuery(GET_USER_SONGS, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError error={error} />
  } else if (isEmpty(data.user.songs)) {
    return (
      <Empty
        title="Your library is empty"
        text={(
          <Fragment>
            <Fragment>You can </Fragment>
            <Link to="/catalog/browse/songs">browse</Link>
            <Fragment> the catalog to add songs.</Fragment>
          </Fragment>
        )}
      />
    )
  } else {
    return (
      <SongsTable
        orderByInit={{ field: "title", order: true }}
        columnsToIgnore={["cover","trackNumber","released"]}
        songs={pipe(data.user.songs)(
          filter(({ inLibrary }) => inLibrary),
          map(({ song, dateCreated, numOfPlays }) => ({ ...song, numOfPlays, dateCreated })),
          orderBy("dateCreated","desc"),
        )}
      />
    )
  }
}

export default LibrarySongs
