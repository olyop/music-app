import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import ApiError from "../ApiError"
import SongsTable from "../SongsTable"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"

import { pipe } from "../../helpers"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { filter, map, orderBy } from "lodash/fp"

import GET_USER_SONGS from "../../graphql/queries/getUserSongs.graphql"

const LibrarySongs = () => {
  const id = useContext(UserContext)

  const { error, data } = useQuery(
    GET_USER_SONGS,
    { fetchPolicy: "cache-and-network", variables: { id } },
  )

  if (!isUndefined(error)) {
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
