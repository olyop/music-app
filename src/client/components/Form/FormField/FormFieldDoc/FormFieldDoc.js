import React from "react"

import Icon from "../../../Icon"
import Img from "../../../Img"

import { string, func } from "prop-types"
import reactBem from "@oly_op/react-bem"
import { isEmpty } from "lodash"

import "./FormFieldDoc.scss"

const bem = reactBem("FormFieldDoc")

const FormFieldDoc = ({ name, photoUrl, onFieldDocRemove }) => (
  <div className={bem("")}>
    {isEmpty(photoUrl) ? null : (
      <Img
        url={photoUrl}
        className={bem("img")}
      />
    )}
    <p
      children={name}
      className={bem("text")}
    />
    <Icon
      icon="close"
      className={bem("close")}
      onClick={onFieldDocRemove}
    />
  </div>
)

FormFieldDoc.propTypes = {
  name: string.isRequired,
  photoUrl: string,
  onFieldDocRemove: func.isRequired
}

FormFieldDoc.defaultProps = {
  photoUrl: ""
}

export default FormFieldDoc
