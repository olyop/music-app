import React, { useState } from "react"

import AddCover from "../AddCover"
import QueryApi from "../../QueryApi"

import { string } from "prop-types"
import { isUndefined, isEmpty } from "lodash"

import GET_GENRE_SEARCH_EXACT from "../../../graphql/queries/getGenreSearchExact.gql"
import GET_ARTIST_SEARCH_EXACT from "../../../graphql/queries/getArtistSearchExact.gql"

const hideDoc = (data, isArtist) => (
  isUndefined(data) ||
  !isEmpty(data[isArtist ? "artistSearch" : "genreSearch"])
)

const AddDoc = ({ doc, type, className }) => {
  const [ cover, setCover ] = useState(null)
  const isArtist = type === "artist"
  return (
    <QueryApi
      spinner={false}
      variables={{ query: doc }}
      query={isArtist ? GET_ARTIST_SEARCH_EXACT : GET_GENRE_SEARCH_EXACT}
      children={
        data => (
          hideDoc(data, isArtist) ? null : (
            <div key={doc} className={`${className} Elevated Card`}>
              {isArtist ? (
                <AddCover
                  landscape
                  name={doc}
                  img={cover}
                  handleChange={setCover}
                />
              ) : null}
              <p className="Text MarginQuart">
                {doc}
              </p>
            </div>
          )
        )
      }
    />
  )
}

AddDoc.propTypes = {
  type: string,
  className: string,
  doc: string.isRequired,
}

AddDoc.defaultProps = {
  type: "artist",
  className: null,
}

export default AddDoc
