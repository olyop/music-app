import React from "react"

import ImgLink from "../../../ImgLink"
import Icon from "../../../Icon"

import { string, func } from "prop-types"
import reactBem from "@oly_op/react-bem"
import { isEmpty } from "lodash"

import "./FormFieldDoc.scss"

const bem = reactBem("FormFieldDoc")

const FormFieldDoc = ({ name, photoUrl, onFieldDocRemove }) => (
  <div className={bem("")}>
    {isEmpty(photoUrl) ? null : (
      <ImgLink
        imgUrl={photoUrl}
        className={bem("img")}
      />
    )}
    <p
      children={name}
      className={bem("text")}
    />
    <Icon
      bem={bem}
      icon="close"
      className="close"
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
