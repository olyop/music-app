import React from "react"

import Icon from "../../Icon"

import { string, shape, func } from "prop-types"
import reactBEM from "@oly_op/react-bem"

import "./FormDoc.scss"

const bem = reactBEM("FormDoc")

const FormDoc = ({ doc, onDocRemove }) => {
  const { id, name, photoUrl } = doc
  return (
    <div id={id} className={bem("")}>
      <img
        alt="doc"
        src={photoUrl}
        className={bem("img")}
      />
      <p
        children={name}
        className={bem("text")}
      />
      <Icon
        bem={bem}
        icon="close"
        className="close"
        onClick={onDocRemove}
      />
    </div>
  )
}

FormDoc.propTypes = {
  doc: shape({
    id: string.isRequired,
    name: string.isRequired,
    photoUrl: string.isRequired
  }).isRequired,
  onDocRemove: func.isRequired
}

export default FormDoc
