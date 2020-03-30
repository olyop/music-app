import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import SongsTable from "../SongsTable"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"

import { isEmpty } from "lodash"
import { pipe } from "../../helpers"
import { filter, map, orderBy } from "lodash/fp"

const LibrarySongs = () => {
  const { songs } = useContext(UserContext)
  if (isEmpty(songs)) {
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
        songs={pipe(songs)(
          filter(({ inLibrary }) => inLibrary),
          map(({ song, dateCreated, numOfPlays }) => ({ ...song, numOfPlays, dateCreated })),
          orderBy("dateCreated","desc"),
        )}
      />
    )
  }
}

export default LibrarySongs
