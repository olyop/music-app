import React from "react"

import Img from "../../Img"
import Icon from "../../Icon"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { determinePhotoKey, determineDocNameKey } from "../../../helpers"

import "./index.scss"

const bem = reactBem("FormFieldListDoc")

const FormFieldListDoc = ({ doc, onFieldDocRemove }) => (
  <div className={bem("")}>
    {doc.__typename === "Genre" ? null : (
      <Img
        className={bem("img")}
        url={doc[determinePhotoKey(doc)]}
      />
    )}
    <p className={bem("text")}>
      {doc[determineDocNameKey(doc)]}
    </p>
    <Icon
      icon="close"
      className={bem("close")}
      onClick={onFieldDocRemove(doc)}
    />
  </div>
)

FormFieldListDoc.propTypes = propTypes
FormFieldListDoc.defaultProps = defaultProps

export default FormFieldListDoc
