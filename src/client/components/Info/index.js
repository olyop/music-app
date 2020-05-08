import React from "react"

import InLibraryButton from "../InLibraryButton"

import reactBem from "@oly_op/react-bem"
import { node, object, string } from "prop-types"

import "./index.scss"

const bem = reactBem("Info")

const Info = ({ doc, upper, lower, className }) => (
  <div className={bem(className, "")}>
    <div className={bem("text")}>
      <p className={bem("text-upper")}>{upper}</p>
      <p className={bem("text-lower")}>{lower}</p>
    </div>
    <InLibraryButton
      doc={doc}
      className={bem("add")}
    />
  </div>
)

Info.propTypes = {
  className: string,
  upper: node.isRequired,
  lower: node.isRequired,
  doc: object.isRequired,
}

Info.defaultProps = {
  className: null,
}

export default Info
