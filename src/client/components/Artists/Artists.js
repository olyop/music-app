import React from "react"

import Loading from "../Loading"
import { Query } from "react-apollo"
import Artist from "../Artist"

import { serializeCollection } from "../../apollo/helpers"
import { Artists as bem } from "../../globals/bem"
import { isEmpty, isUndefined } from "lodash"
import query from "./query"

import "./Artists.scss"

const Artists = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading/>
        } else if (!isUndefined(error)) {
          return console.error(error)
        } else if (isEmpty(data.artists)) {
          return "Empty."
        } else {
          const artists = serializeCollection(data.artists)
          return artists.map(
            ({ id, name }) => (
              <Artist
                id={id}
                key={id}
                name={name}
              />
            )
          )
        }
      }}
    </Query>
  </div>
)

export default Artists
