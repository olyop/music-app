import React, { Fragment, useContext } from "react"

import Empty from "../../Empty"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import { Link } from "react-router-dom"
import SongsTable from "../../SongsTable"
import UserContext from "../../../contexts/User"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_SONGS from "../../../graphql/queries/getSongs.graphql"

const BrowseSongs = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_SONGS,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError/>
  }

  if (isEmpty(data.songs)) {
    return (
      <Empty
        title="The catalog is empty."
        text={(
          <Fragment>
            <Fragment>You can </Fragment>
            <Link to="/catalog/add/song">add</Link>
            <Fragment> songs to the catalog.</Fragment>
          </Fragment>
        )}
      />
    )
  }

  return (
    <SongsTable
      songs={data.songs}
      orderByInit={{ field: "title", order: true }}
      columnsToIgnore={["trackNumber", "numOfPlays", "released", "dateCreated"]}
    />
  )
}

export default BrowseSongs
