import React from "react"

import Img from "../../Img"
import Icon from "../../Icon"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { determineDocPhotoKey, determineDocNameKey } from "../../../helpers"

import "./index.scss"

const bem = reactBem("FormFieldDoc")

const FormFieldDoc = ({ doc, onFieldDocRemove }) => (
  <div className={bem("")}>
    {doc.__typename === "Genre" ? null : (
      <Img
        className={bem("cover")}
        url={doc[determineDocPhotoKey(doc)]}
      />
    )}
    <p
      className={bem("text")}
      children={doc[determineDocNameKey(doc)]}
    />
    <Icon
      icon="close"
      className={bem("close")}
      onClick={onFieldDocRemove(doc)}
    />
  </div>
)

FormFieldDoc.propTypes = propTypes
FormFieldDoc.defaultProps = defaultProps

export default FormFieldDoc
