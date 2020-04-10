import React, { Fragment } from "react"

import QueryApi from "../QueryApi"
import SongsTable from "../SongsTable"

import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"

import GET_GENRE_PAGE from "../../graphql/queries/getGenrePage.graphql"

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
              <h1 className={bem("name")}>{name}</h1>
              <div className={bem("songs")}>
                <SongsTable
                  songs={songs}
                  columnsToIgnore={["numOfPlays", "trackNumber", "released", "dateAdded"]}
                />
              </div>
            </Fragment>
          )
        }
      }
    />
  </div>
)

export default GenrePage
