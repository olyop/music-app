import React from "react"

import Form from "../../../Form"
import Spinner from "../../../Spinner"
import ApiError from "../../../ApiError"

import { isUndefined } from "lodash"
import fieldsConfig from "./fieldsConfig"
import { useQuery, useMutation } from "@apollo/react-hooks"

import ADD_ALBUM from "../../../../graphql/mutations/addAlbum.graphql"
import GET_ADD_ALBUM from "../../../../graphql/queries/getAddAlbum.graphql"

const AddAlbum = () => {
  const { loading, error, data } = useQuery(GET_ADD_ALBUM)
  const [ addAlbum, addAlbumResult ] = useMutation(ADD_ALBUM)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError error={error} />
  } else {
    return (
      <Form
        title="Album"
        result={addAlbumResult}
        fields={fieldsConfig(data)}
        submit={variables => addAlbum({ variables })}
      />
    )
  }
}

export default AddAlbum
