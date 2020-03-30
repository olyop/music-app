import React from "react"

import Form from "../../../Form"
import Spinner from "../../../Spinner"
import ApiError from "../../../ApiError"

import { isUndefined } from "lodash"
import fieldsConfig from "./fieldsConfig"
import { useQuery, useMutation } from "@apollo/react-hooks"

import ADD_ALBUM from "../../../../graphql/mutations/addAlbum.graphql"
import GET_ARTISTS from "../../../../graphql/queries/getArtists.graphql"

const AddAlbum = () => {
  const [ addAlbum ] = useMutation(ADD_ALBUM)
  const { loading, error, data } = useQuery(GET_ARTISTS)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    return (
      <Form
        title="Album"
        fields={fieldsConfig(data)}
        submit={variables => addAlbum({ variables })}
      />
    )
  }
}

export default AddAlbum
