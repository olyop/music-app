import React from "react"

import InLibraryButton from "../InLibraryButton"

import reactBem from "@oly_op/react-bem"
import { node, object, string } from "prop-types"

import "./index.scss"

const bem = reactBem("Info")

const Info = ({ doc, upper, lower, className, addClassName, textClassName }) => (
  <div className={bem(className, "")}>
    <div className={bem(textClassName, "text")}>
      <p className={bem("text-upper")}>{upper}</p>
      <p className={bem("text-lower")}>{lower}</p>
    </div>
    <InLibraryButton
      doc={doc}
      className={bem(addClassName, "add")}
    />
  </div>
)

Info.propTypes = {
  className: string,
  addClassName: string,
  textClassName: string,
  upper: node.isRequired,
  lower: node.isRequired,
  doc: object.isRequired,
}

Info.defaultProps = {
  className: null,
  addClassName: null,
  textClassName: null,
}

export default Info
