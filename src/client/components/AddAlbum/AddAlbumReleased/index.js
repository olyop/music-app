import React from "react"

import QueryApi from "../../QueryApi"

import { propTypes } from "./props"
import { compose, deserializeDate } from "../../../helpers"

import GET_ALBUM_RELEASED from "../../../graphql/queries/getAlbumReleased.gql"

const AddAlbumReleased = ({ album, artist, children }) => (
  <QueryApi
    query={GET_ALBUM_RELEASED}
    resultPath="getAlbumReleased"
    variables={{ album, artist }}
    children={compose(deserializeDate, children)}
  />
)

AddAlbumReleased.propTypes = propTypes

export default AddAlbumReleased
