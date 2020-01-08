import React from "react"

import Form from "../../../Form"
import Loading from "../../../Loading"
import ApiError from "../../../ApiError"

import { isUndefined } from "lodash"
import fieldsConfig from "./fieldsConfig"
import { useQuery, useMutation } from "@apollo/react-hooks"
import ADD_ALBUM from "../../../../graphql/addAlbum.graphql"
import GET_ADD_ALBUM from "../../../../graphql/getAddAlbum.graphql"

const AddAlbum = () => {
  const [ addAlbum ] = useMutation(ADD_ALBUM)
  const { loading, error, data } = useQuery(GET_ADD_ALBUM)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    return (
      <Form
        title="Add Album"
        fields={fieldsConfig(data)}
        submit={variables => addAlbum({ variables })}
      />
    )
  }
}

export default AddAlbum
