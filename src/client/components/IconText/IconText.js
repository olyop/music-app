import React, { Fragment } from "react"

import Icon from "../Icon"

import reactBem from "@oly_op/react-bem"
import { string } from "prop-types"
import { noop } from "lodash"

import "./IconText.scss"

const bem = reactBem("IconText")

const IconText = ({ icon, text, className, iconClassName }) => (
  <button
    onClick={noop}
    className={bem({ ignore: true, className }, "")}
    type="button"
    children={(
      <Fragment>
        <Icon
          icon={icon}
          className={iconClassName}
        />
        <p className={bem("text")}>{text}</p>
      </Fragment>
    )}
  />
)

IconText.propTypes = {
  icon: string.isRequired,
  text: string.isRequired,
  className: string,
  iconClassName: string
}

IconText.defaultProps = {
  className: undefined,
  iconClassName: undefined
}

export default IconText
