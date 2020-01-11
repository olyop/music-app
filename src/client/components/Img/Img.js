import React from "react"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "prop-types"

import "./Img.scss"

const bem = reactBem("Img")

const Img = ({ url, children, className, imgClassName }) => (
  <div className={bem({ ignore: true, className }, "")}>
    <div
      style={{ backgroundImage: `url("${url}")` }}
      className={bem({ ignore: true, className: imgClassName }, "img")}
    />
    {children}
  </div>
)

Img.propTypes = propTypes
Img.defaultProps = defaultProps

export default Img
