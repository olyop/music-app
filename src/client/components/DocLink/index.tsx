import React, { FunctionComponent } from "react"

import { Link } from "react-router-dom"
import { Album, Artist } from "../../types"

import reactBem from "@oly_op/react-bem"
import { determineDocPath, determineDocNameKey } from "../../helpers"

import "./index.scss"

const bem = reactBem("DocLink")

interface PropTypes {
  doc: Album | Artist
}

const DocLink: FunctionComponent<PropTypes> = ({ doc }) => {
  const text = doc[determineDocNameKey(doc)]
  return (
    <Link
      title={text}
      children={text}
      className={bem("")}
      to={determineDocPath(doc)}
    />
  )
}

export default DocLink
