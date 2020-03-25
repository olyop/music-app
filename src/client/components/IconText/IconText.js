import React, { Fragment } from "react"

import Icon from "../Icon"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./IconText.scss"

const bem = reactBem("IconText")

const IconText = ({ icon, text, onClick, className, iconClassName, textClassName }) => (
  <button
    type="button"
    onClick={onClick}
    className={bem({ ignore: true, className }, "")}
    children={(
      <Fragment>
        <Icon
          icon={icon}
          className={bem({ ignore: true, className: iconClassName }, "icon")}
        />
        <p
          children={text}
          className={bem({ ignore: true, className: textClassName }, "text")}
        />
      </Fragment>
    )}
  />
)

IconText.propTypes = propTypes
IconText.defaultProps = defaultProps

export default IconText
