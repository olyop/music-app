import React from "react"

import AddDoc from "../AddDoc"
import AddLabel from "../AddLabel"

import reactBem from "@oly_op/react-bem"
import { arrayOf, string } from "prop-types"

import "./index.scss"

const bem = reactBem("AddDocs")

const AddDocs = ({ docs, label, className }) => (
  <div className={bem(className)}>
    <AddLabel
      children={label}
      className={bem("label", "MarginBottomHalf")}
    />
    {docs.map(
      doc => (
        <AddDoc
          key={doc}
          doc={doc}
          className={bem("item")}
        />
      ),
    )}
  </div>
)

AddDocs.propTypes = {
  className: string,
  label: string.isRequired,
  docs: arrayOf(string).isRequired,
}

AddDoc.defaultProps = {
  className: null,
}

export default AddDocs
