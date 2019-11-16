import React from "react"

import { string, node } from "prop-types"
import reactBem from "@oly_op/react-bem"

import "./Img.scss"

const bem = reactBem("Img")

const Img = ({ url, className, imgClassName, children }) => (
  <div className={bem({ ignore: true, className }, "")}>
    <div
      style={{ backgroundImage: `url("${url}")` }}
      className={bem({ ignore: true, className: imgClassName }, "img")}
    />
    {children}
  </div>
)

Img.propTypes = {
  children: node,
  className: string,
  imgClassName: string,
  url: string.isRequired
}

Img.defaultProps = {
  children: null,
  className: undefined,
  imgClassName: undefined
}

export default Img
