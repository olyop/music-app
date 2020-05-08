import React from "react"

import reactBem from "@oly_op/react-bem"
import { node, string } from "prop-types"

import "./index.scss"

const bem = reactBem("Img")

const Img = ({ url, children, className, imgClassName }) => (
  <div className={bem(className, "")}>
    <div
      style={{ backgroundImage: `url(${url})` }}
      className={bem(imgClassName, "img")}
    />
    {children}
  </div>
)

Img.propTypes = {
  url: string,
  children: node,
  className: string,
  imgClassName: string,
}

Img.defaultProps = {
  url: "",
  children: null,
  className: null,
  imgClassName: null,
}

export default Img
