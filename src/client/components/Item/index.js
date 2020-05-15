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
  showInLibrary,
  infoClassName,
  inLibClassName,
}) => (
  <div className={bem(className, "")}>
    {left ? (
      <p
        children={left}
        className={bem("left")}
      />
    ) : null}
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
    <div className={bem(infoClassName, "info")}>
      <div className={bem("info-text")}>
        <p
          children={upper}
          className={bem("info-text-upper")}
        />
        {lower ? (
          <p
            children={lower}
            className={bem("info-text-lower")}
          />
        ) : null}
      </div>
      {showInLibrary ? (
        <InLibraryButton
          doc={doc}
          className={bem(inLibClassName, "info-in-lib")}
        />
      ) : null}
    </div>
    {right ? (
      <p
        children={right}
        className={bem("right")}
      />
    ) : null}
  </div>
)

Item.propTypes = {
  left: node,
  right: node,
  doc: object,
  lower: node,
  imgDoc: object,
  showPlay: bool,
  className: string,
  showInLibrary: bool,
  infoClassName: string,
  inLibClassName: string,
  upper: node.isRequired,
}

Item.defaultProps = {
  left: null,
  lower: null,
  right: null,
  imgDoc: null,
  showPlay: true,
  className: null,
  infoClassName: null,
  showInLibrary: true,
  inLibClassName: null,
}

export default Item
