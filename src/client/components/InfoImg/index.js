import React from "react"

import Img from "../Img"
import Info from "../Info"
import { Link } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { string, node, object } from "prop-types"
import { determineDocPhotoKey } from "../../helpers"

import "./index.scss"

const bem = reactBem("InfoImg")

const InfoImg = ({ doc, lower, upper, imgDoc, className, infoClassName }) => (
  <div className={bem(className, "")}>
    <Link
      title={imgDoc.title}
      to={`/album/${imgDoc.albumId}`}
      children={(
        <Img
          imgClassName={bem("cover-img")}
          url={imgDoc[determineDocPhotoKey(imgDoc)]}
          className={bem("cover", "Card", "Elevated")}
        />
      )}
    />
    <Info
      doc={doc}
      upper={upper}
      lower={lower}
      className={infoClassName}
    />
  </div>
)

InfoImg.propTypes = {
  imgDoc: object,
  className: string,
  infoClassName: string,
  upper: node.isRequired,
  lower: node.isRequired,
  doc: object.isRequired,
}

InfoImg.defaultProps = {
  imgDoc: null,
  className: null,
  infoClassName: null,
}

export default InfoImg
