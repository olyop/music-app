import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import SongsTable from "../SongsTable"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"

import { pipe } from "../../helpers"
import { filter, orderBy } from "lodash/fp"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_SONGS from "../../graphql/queries/getUserSongs.graphql"

const LibrarySongs = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_USER_SONGS,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  if (isEmpty(data.user.songs)) {
    return (
      <Empty
        title="Your library is empty"
        text={(
          <Fragment>
            <Fragment>You can browse the </Fragment>
            <Link to="/catalog/browse/songs">catalog</Link>
            <Fragment> to add songs.</Fragment>
          </Fragment>
        )}
      />
    )
  }

  return (
    <SongsTable
      orderByInit={{ field: "title", order: true }}
      columnsToIgnore={["trackNumber", "released"]}
      songs={pipe(data.user.songs)(
        filter(({ inLibrary }) => inLibrary),
        orderBy("dateCreated", "desc"),
      )}
    />
  )
}

export default LibrarySongs
