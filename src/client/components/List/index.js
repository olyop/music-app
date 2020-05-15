import React, { useContext } from "react"

import ListStyleContext from "../../contexts/ListStyle"

import reactBem from "@oly_op/react-bem"
import { node, string } from "prop-types"

const bem = reactBem("Albums")

const List = ({ children, className }) => {
  const { listStyle } = useContext(ListStyleContext)
  const listClassName = listStyle === "grid" ? "Grid" : "Elevated"
  return (
    <div className={bem(className, listClassName)}>
      {children}
    </div>
  )
}

List.propTypes = {
  className: string,
  children: node.isRequired,
}

List.defaultProps = {
  className: null,
}

export default List
