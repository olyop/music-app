import React, { Fragment } from "react"

import Icon from "../Icon"

import { noop } from "lodash"
import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./IconText.scss"

const bem = reactBem("IconText")

const IconText = ({ icon, text, className, iconClassName }) => (
  <button
    type="button"
    onClick={noop}
    className={bem({ ignore: true, className }, "")}
    children={(
      <Fragment>
        <Icon
          icon={icon}
          className={iconClassName}
        />
        <p
          children={text}
          className={bem("text")}
        />
      </Fragment>
    )}
  />
)

IconText.propTypes = propTypes
IconText.defaultProps = defaultProps

export default IconText
