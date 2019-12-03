import React, { Fragment } from "react"

import Img from "../../Img"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { catalogUrl } from "../../../helpers/misc"
import determineKeyName from "../../../helpers/determineKeyName"

import "./FormDropDownItem.scss"

const bem = reactBem("FormDropDownItem")

const FormDropDownItem = ({ doc, onFieldHitClick, tabIndex }) => {
  const { id } = doc
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      className={bem("")}
      onClick={onFieldHitClick}
      children={(
        <Fragment>
          {doc.__typename === "Genre" ? null : (
            <Img
              url={catalogUrl(id)}
              className={bem("img")}
            />
          )}
          <span>{doc[determineKeyName(doc)]}</span>
        </Fragment>
      )}
    />
  )
}

FormDropDownItem.propTypes = propTypes
FormDropDownItem.defaultProps = defaultProps

export default FormDropDownItem
