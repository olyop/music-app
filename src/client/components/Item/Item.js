import React from "react"

import Img from "../Img"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Item.scss"

const bem = reactBem("Item")

const Item = ({ url, text }) => (
  <div className={bem("")}>
    <Img
      url={url}
      className={bem("img")}
    />
    <p
      children={text}
      className={bem("text")}
    />
  </div>
)

Item.propTypes = propTypes

export default Item
