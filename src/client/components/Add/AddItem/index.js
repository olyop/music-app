import React from "react"

import Img from "../../Img"
import Icon from "../../Icon"
import QueryApi from "../../QueryApi"
import AddAlbumInput from "../AddInput"

import reactBem from "@oly_op/react-bem"
import { func, string } from "prop-types"
import { isEmpty, isUndefined } from "lodash"

import "./index.scss"

import GET_ARTIST_SEARCH from "../../../graphql/queries/getArtistSearch.gql"

const bem = reactBem("AddItem")

const hideCover = (data, val) => (
  isUndefined(data) ||
  isEmpty(data.artistSearch) ||
  data.artistSearch[0].name !== val
)

const AddItem = ({ val, handleInput, handleRemove, className }) => (
  <div className={bem(className, "")}>
    <QueryApi
      query={GET_ARTIST_SEARCH}
      variables={{ query: val }}
      spinner={false}
      children={
        data => (hideCover(data, val) ? null : (
          <Img
            className={bem("img")}
            url={data.artistSearch[0].photo}
          />
        ))
      }
    />
    <AddAlbumInput
      val={val}
      className={bem("input")}
      handleChange={handleInput}
    />
    <Icon
      icon="close"
      title="Delete"
      onClick={handleRemove}
      className={bem("remove")}
    />
  </div>
)

AddItem.propTypes = {
  className: string,
  val: string.isRequired,
  handleInput: func.isRequired,
  handleRemove: func.isRequired,
}

AddItem.defaultProps = {
  className: null,
}

export default AddItem
