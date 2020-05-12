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
  left,
  upper,
  lower,
  right,
  imgDoc,
  showPlay,
  className,
  addClassName,
}) => (
  <div className={bem(className, "")}>
    {left ? <p className={bem("left")}>{left}</p> : null}
    {showPlay ? (
      <PlayButton
        doc={doc}
        className={bem("play")}
      />
    ) : null}
    {imgDoc ? (
      <Link
        className={bem("img-link")}
        to={determineDocPath(imgDoc)}
        title={doc[determineDocNameKey(imgDoc)]}
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
        <p
          children={upper}
          className={bem("info-text-upper")}
          style={{ marginBottom: lower ? null : 0 }}
        />
        {lower ? (
          <p
            children={lower}
            className={bem("info-text-lower")}
          />
        ) : null}
      </div>
      <InLibraryButton
        doc={doc}
        className={bem(addClassName, "info-add")}
      />
    </div>
    {right ? <p className={bem("right")}>{right}</p> : null}
  </div>
)

Item.propTypes = {
  left: node,
  right: node,
  lower: node,
  imgDoc: object,
  showPlay: bool,
  className: string,
  addClassName: string,
  doc: object.isRequired,
  upper: node.isRequired,
}

Item.defaultProps = {
  left: null,
  lower: null,
  right: null,
  imgDoc: null,
  showPlay: true,
  className: null,
  addClassName: null,
}

export default Item
