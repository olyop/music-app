import React, { Fragment } from "react"

import Icon from "../Icon"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("IconText")

const IconText = ({
  icon, text, onClick, className, iconClassName, textClassName,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={bem(className, "", "Hover", "PaddingHalf")}
    children={(
      <Fragment>
        <Icon
          icon={icon}
          className={bem(iconClassName, "icon")}
        />
        <span
          children={text}
          className={bem(textClassName, "text")}
        />
      </Fragment>
    )}
  />
)

IconText.propTypes = propTypes
IconText.defaultProps = defaultProps

export default IconText
