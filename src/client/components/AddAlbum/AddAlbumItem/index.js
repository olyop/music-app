import React from "react"

import Img from "../../Img"
import Icon from "../../Icon"
import QueryApi from "../../QueryApi"
import AddAlbumInput from "../AddAlbumInput"

import reactBem from "@oly_op/react-bem"
import { func, string } from "prop-types"
import { isEmpty, isUndefined } from "lodash"

import "./index.scss"

import GET_ARTIST_SEARCH from "../../../graphql/queries/getArtistSearch.gql"

const bem = reactBem("AddAlbumItem")

const AddAlbumItem = ({ val, handleInput, className }) => (
  <div className={bem(className, "")}>
    <QueryApi
      query={GET_ARTIST_SEARCH}
      variables={{ query: val }}
      spinner={false}
      children={
        data => (
          isUndefined(data) || isEmpty(data.artistSearch) ? null : (
            <Img
              className={bem("img")}
              url={data.artistSearch[0].photo}
            />
          )
        )
      }
    />
    <AddAlbumInput
      val={val}
      className={bem("input")}
      handleChange={handleInput}
    />
    <Icon
      icon="close"
      className={bem("delete")}
    />
  </div>
)

AddAlbumItem.propTypes = {
  className: string,
  val: string.isRequired,
  handleInput: func.isRequired,
}

AddAlbumItem.defaultProps = {
  className: null,
}

export default AddAlbumItem
