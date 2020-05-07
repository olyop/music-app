import React from "react"

import Info from "../Info"
import InfoImg from "../InfoImg"
import PlayButton from "../PlayButton"

import reactBem from "@oly_op/react-bem"
import { node, string, bool, object } from "prop-types"

import "./index.scss"

const bem = reactBem("Item")

const Item = ({
  doc,
  upper,
  lower,
  img,
  imgUrl,
  showImg,
  showPlay,
  imgTitle,
  className,
}) => (
  <div className={bem(className, "")}>
    {showPlay ? (
      <PlayButton
        doc={doc}
        className={bem("play")}
      />
    ) : null}
    {showImg ? (
      <InfoImg
        doc={doc}
        img={img}
        upper={upper}
        lower={lower}
        imgUrl={imgUrl}
        imgTitle={imgTitle}
        className={bem("info")}
        addClassName={bem("info-add")}
        textClassName={bem("info-text")}
      />
    ) : (
      <Info
        doc={doc}
        upper={upper}
        lower={lower}
        className={bem("info")}
        addClassName={bem("info-add")}
        textClassName={bem("info-text")}
      />
    )}
  </div>
)

Item.propTypes = {
  img: string,
  showImg: bool,
  showPlay: bool,
  imgUrl: string,
  imgTitle: string,
  className: string,
  doc: object.isRequired,
  upper: node.isRequired,
  lower: node.isRequired,
}

Item.defaultProps = {
  img: "",
  imgUrl: "",
  imgTitle: "",
  showImg: true,
  showPlay: true,
  className: null,
}

export default Item
