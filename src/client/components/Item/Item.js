import React from "react"

import Img from "../Img"
import PlayButton from "../PlayButton"
import { Link } from "react-router-dom"
import InLibraryButton from "../InLibraryButton"

import reactBem from "@oly_op/react-bem"
import { node, object, bool, string } from "prop-types"

import {
  determineDocPath,
  determineDocNameKey,
  determineDocPhotoKey,
} from "../../helpers"

import "./index.scss"

const bem = reactBem("Item")

const Item = ({
  doc,
  upper,
  lower,
  right,
  imgDoc,
  showPlay,
  className,
}) => (
  <div className={bem(className, "")}>
    {showPlay ? (
      <PlayButton
        doc={doc}
        className={bem("play")}
      />
    ) : null}
    {imgDoc ? (
      <Link
        to={determineDocPath(doc)}
        className={bem("img-link")}
        title={doc[determineDocNameKey(doc)]}
        children={(
          <Img
            className={bem("img", "Card", "Elevated")}
            url={imgDoc[determineDocPhotoKey(imgDoc)]}
          />
        )}
      />
    ) : null}
    <div className={bem("info")}>
      <div className={bem("info-text")}>
        <p className={bem("info-text-upper")}>{upper}</p>
        <p className={bem("info-text-lower")}>{lower}</p>
      </div>
      <InLibraryButton
        doc={doc}
        className={bem("info-add")}
      />
    </div>
    {right && <div className={bem("right")}>{right}</div>}
  </div>
)

Item.propTypes = {
  right: node,
  imgDoc: object,
  className: string,
  showPlay: bool,
  doc: object.isRequired,
  upper: node.isRequired,
  lower: node.isRequired,
}

Item.defaultProps = {
  right: null,
  imgDoc: null,
  showPlay: true,
  className: null,
}

export default Item
