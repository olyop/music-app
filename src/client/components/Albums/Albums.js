import React from "react"

import Loading from "../Loading"
import { Query } from "react-apollo"
import Album from "../Album"

import { serializeCollection } from "../../apollo/helpers"
import { Albums as bem } from "../../globals/bem"
import { isEmpty, isUndefined } from "lodash"
import query from "./query"

import "./Albums.scss"

const Albums = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading/>
        } else if (!isUndefined(error)) {
          return console.error(error)
        } else if (isEmpty(data.albums)) {
          return "Empty."
        } else {
          const albums = serializeCollection(data.albums)
          return albums.map(
            ({ id, title, artist }) => (
              <Album
                id={id}
                key={id}
                title={title}
                artistName={artist.name}
              />
            )
          )
        }
      }}
    </Query>
  </div>
)

export default Albums
