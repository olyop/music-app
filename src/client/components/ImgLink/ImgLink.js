import React from "react"

import { Link } from "react-router-dom"

import { string, node } from "prop-types"
import reactBem from "@oly_op/react-bem"

import "./ImgLink.scss"

const bem = reactBem("ImgLink")

const ImgLink = ({ linkUrl, imgUrl, className, imgClassName, children }) => (
  <div className={bem({ ignore: true, className }, "")}>
    <Link
      to={linkUrl}
      className={bem({ ignore: true, className: imgClassName }, "img")}
      style={{ backgroundImage: `url("${imgUrl}")` }}
    />
    {children}
  </div>
)

ImgLink.propTypes = {
  children: node,
  linkUrl: string,
  className: string,
  imgClassName: string,
  imgUrl: string.isRequired
}

ImgLink.defaultProps = {
  linkUrl: "#",
  children: null,
  className: undefined,
  imgClassName: undefined
}

export default ImgLink
