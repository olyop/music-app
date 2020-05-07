import React from "react"

import Img from "../Img"
import Info from "../Info"
import { Link } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { string, node, object } from "prop-types"

import "./index.scss"

const bem = reactBem("InfoImg")

const InfoImg = ({
  doc,
  lower,
  upper,
  img,
  imgUrl,
  imgTitle,
  className,
}) => (
  <div className={bem(className, "")}>
    <Link
      to={imgUrl}
      title={imgTitle}
      children={(
        <Img
          url={img}
          imgClassName={bem("cover-img")}
          className={bem("cover", "Card", "Elevated")}
        />
      )}
    />
    <Info
      doc={doc}
      upper={upper}
      lower={lower}
      className={bem("info")}
      addClassName={bem("info-add")}
      textClassName={bem("info-text")}
    />
  </div>
)

InfoImg.propTypes = {
  img: string,
  imgUrl: string,
  imgTitle: string,
  className: string,
  upper: node.isRequired,
  lower: node.isRequired,
  doc: object.isRequired,
}

InfoImg.defaultProps = {
  img: "",
  imgUrl: "",
  imgTitle: "",
  className: null,
}

export default InfoImg
