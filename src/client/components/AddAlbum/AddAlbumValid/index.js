import React from "react"

import Icon from "../../Icon"

import reactBem from "@oly_op/react-bem"
import { string, bool } from "prop-types"

import "./index.scss"

const bem = reactBem("AddAlbumValid")

const AddAlbumValid = ({ isValid, className }) => (
  <Icon
    className={bem(className, "")}
    icon={isValid ? "done" : "close"}
    style={{ color: isValid ? "green" : "red" }}
  />
)

AddAlbumValid.propTypes = {
  className: string,
  isValid: bool.isRequired,
}

AddAlbumValid.defaultProps = {
  className: null,
}

export default AddAlbumValid
