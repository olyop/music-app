import React from "react"

import Loading from "../Loading"
import { Query } from "react-apollo"
import Icon from "../Icon"
import Song from "../Song"

import { serializeCollection } from "../../apollo/helpers"
import { Songs as bem } from "../../globals/bem"
import { isEmpty, isUndefined } from "lodash"
import query from "./query"

import "./Songs.scss"

const Songs = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading/>
        } else if (!isUndefined(error)) {
          return console.error(error)
        } else if (isEmpty(data.songs)) {
          return "Empty."
        } else {
          const songs = serializeCollection(data.songs)
          return (
            <table className={bem("table")}>
              <thead className={bem("tableHead")}>
                <tr className={bem("tableHeadRow")}>
                  <th className={bem("tableHeadCol", "tableHeadCover")}>
                    <Icon
                      bem={bem}
                      icon="album"
                      className="tableHeadIcon"
                    />
                  </th>
                  <th className={bem("tableHeadCol")}>Title</th>
                  <th className={bem("tableHeadCol")}>Artist</th>
                  <th className={bem("tableHeadCol")}>Album</th>
                </tr>
              </thead>
              <tbody className={bem("tableBody")}>
                {songs.map(
                  ({ id, title, artist, album }) => (
                    <Song
                      key={id}
                      title={title}
                      artistName={artist.name}
                      albumId={album.id}
                      albumTitle={album.title}
                    />
                  )
                )}
              </tbody>
            </table>
          )
        }
      }}
    </Query>
  </div>
)

export default Songs
