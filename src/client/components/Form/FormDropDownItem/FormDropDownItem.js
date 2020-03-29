import React, { Fragment } from "react"

import Img from "../../Img"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { determinePhotoKey, determineNameKey } from "../../../helpers"

import "./FormDropDownItem.scss"

const bem = reactBem("FormDropDownItem")

const FormDropDownItem = ({ doc, tabIndex, onFieldHitClick }) => (
  <button
    type="button"
    tabIndex={tabIndex}
    className={bem("")}
    onClick={onFieldHitClick}
    children={(
      <Fragment>
        {doc.__typename === "Genre" ? null : (
          <Img
            className={bem("img")}
            url={doc[determinePhotoKey(doc)]}
          />
        )}
        <span>{doc[determineNameKey(doc)]}</span>
      </Fragment>
    )}
  />
)

FormDropDownItem.propTypes = propTypes
FormDropDownItem.defaultProps = defaultProps

export default FormDropDownItem
