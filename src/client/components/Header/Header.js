import React from "react"

import Icon from "../Icon"

import { Header as bem } from "../../globals/bem"
import { propTypes } from "./props"

import "./Header.scss"

const Header = ({ sidebar, toggleSidebar }) => (
  <header className={bem("")}>
    <Icon
      bem={bem}
      className="hamburger"
      onClick={toggleSidebar}
      icon={sidebar ? "clear" : "menu"}
    />
  </header>
)

Header.propTypes = propTypes

export default Header
