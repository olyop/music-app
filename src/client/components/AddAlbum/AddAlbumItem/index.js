import React, { Fragment } from "react"

import Img from "../../Img"
import Icon from "../../Icon"
import QueryApi from "../../QueryApi"

import { propTypes } from "./props"
import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"

import GET_GENRE_SEARCH from "../../../graphql/queries/getGenreSearch.gql"
import GET_ARTIST_SEARCH from "../../../graphql/queries/getArtistSearch.gql"

import "./index.scss"

const bem = reactBem("AddAlbumItem")

const AddAlbumItem = ({ query, docType }) => (
  <QueryApi
    className={bem("", "Card", "Elevated")}
    variables={{ query }}
    query={docType === "genre" ? GET_GENRE_SEARCH : GET_ARTIST_SEARCH}
    resultPath={docType === "genre" ? "genreSearch" : "artistSearch"}
    children={res => {
      const doc = res[0]
      console.log(doc)
      return (
        <Fragment>
          {isUndefined(doc) || docType === "genre" ? null : (
            <Img
              url={doc.photo}
              className={bem("img")}
            />
          )}
          <p
            className="Text"
            children={isUndefined(doc) ? query : doc.name}
          />
          <Icon
            icon="close"
            title="Close"
            className={bem("close")}
          />
        </Fragment>
      )
    }}
  />
)

AddAlbumItem.propTypes = propTypes

export default AddAlbumItem
