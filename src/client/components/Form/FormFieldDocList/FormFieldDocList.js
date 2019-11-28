import React from "react"

import Img from "../../Img"
import Icon from "../../Icon"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { catalogUrl } from "../../../helpers/misc"
import determineKeyName from "../../../helpers/determineKeyName"

import "./FormFieldDocList.scss"

const bem = reactBem("FormFieldDocList")

const FormFieldDocList = ({ doc, onFieldDocRemove }) => {
  const { id } = doc
  return (
    <div className={bem("")}>
      {doc.__typename === "Genre" ? null : (
        <Img
          url={catalogUrl(id)}
          className={bem("img")}
        />
      )}
      <p
        className={bem("text")}
        children={doc[determineKeyName(doc)]}
      />
      <Icon
        icon="close"
        className={bem("close")}
        onClick={onFieldDocRemove(doc)}
      />
    </div>
  )
}

FormFieldDocList.propTypes = propTypes
FormFieldDocList.defaultProps = defaultProps

export default FormFieldDocList
