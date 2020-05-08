import React, { Fragment } from "react"

import QueryApi from "../QueryApi"
import { ItemSong } from "../Item"

import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"

import GET_GENRE_PAGE from "../../graphql/queries/getGenrePage.gql"

import "./index.scss"

const bem = reactBem("GenrePage")

const GenrePage = () => (
  <div className={bem("")}>
    <QueryApi
      query={GET_GENRE_PAGE}
      variables={useParams()}
      children={
        ({ genre }) => {
          const { name, songs } = genre
          return (
            <Fragment>
              <h1 className={bem("name", "Elevated")}>{name}</h1>
              <div className="Padding">
                <div className="Elevated">
                  {songs.map(song => <ItemSong song={song} />)}
                </div>
              </div>
            </Fragment>
          )
        }
      }
    />
  </div>
)

export default GenrePage
