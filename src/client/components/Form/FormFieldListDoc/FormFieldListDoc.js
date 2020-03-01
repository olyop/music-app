import React from "react"

import Img from "../../Img"
import Icon from "../../Icon"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { catalogUrl } from "../../../helpers/misc"
import determineKeyName from "../../../helpers/determineKeyName"

import "./FormFieldListDoc.scss"

const bem = reactBem("FormFieldListDoc")

const FormFieldListDoc = ({ doc, onFieldDocRemove }) => {
  const { id } = doc
  return (
    <div className={bem("")}>
      {doc.__typename === "Genre" ? null : (
        <Img
          url={catalogUrl(id)}
          className={bem("img")}
        />
      )}
      <p className={bem("text")}>
        {doc[determineKeyName(doc)]}
      </p>
      <Icon
        icon="close"
        className={bem("close")}
        onClick={onFieldDocRemove(doc)}
      />
    </div>
  )
}

FormFieldListDoc.propTypes = propTypes
FormFieldListDoc.defaultProps = defaultProps

export default FormFieldListDoc
