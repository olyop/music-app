import React, { useState } from "react"

import AddCover from "../AddCover"
import QueryApi from "../../QueryApi"

import { string } from "prop-types"
import { isUndefined, isEmpty } from "lodash"

import GET_ARTIST_SEARCH from "../../../graphql/queries/getArtistSearch.gql"

const hideDoc = data =>
  (isUndefined(data) || !isEmpty(data.artistSearch))

const AddDoc = ({ doc, className }) => {
  const init = new Blob([""], { type: "image/jpeg" })
  const [ cover, setCover ] = useState(init)
  return (
    <QueryApi
      spinner={false}
      query={GET_ARTIST_SEARCH}
      variables={{ query: doc }}
      children={
        data => (
          hideDoc(data) ? null : (
            <div key={doc} className={`${className} Elevated Card`}>
              <AddCover
                landscape
                img={cover}
                handleChange={setCover}
              />
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
  className: string,
  doc: string.isRequired,
}

AddDoc.defaultProps = {
  className: null,
}

export default AddDoc
