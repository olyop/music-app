import React from "react"

import Icon from "../Icon"

import { Header as bem } from "../../globals/bem"
import { noop } from "lodash"

import "./Header.scss"

const Header = () => (
  <header className={bem("")}>
    <Icon
      bem={bem}
      className="hamburger"
      onClick={noop}
      icon="menu"
    />
  </header>
)

export default Header
