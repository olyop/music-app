import React from "react"

import Img from "../../Img"
import Icon from "../../Icon"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

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

FormFieldDoc.propTypes = propTypes
FormFieldDoc.defaultProps = defaultProps

export default FormFieldDoc
