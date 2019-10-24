import React from "react"

import Icon from "../Icon"

import reactBEM from "@oly_op/react-bem"
import { node } from "prop-types"

import "./Songs.scss"

const bem = reactBEM("Songs")

const Songs = ({ children }) => (
  <div className={bem("")}>
    <table className={bem("table")}>
      <thead className={bem("tableHead")}>
        <tr className={bem("tableHeadRow")}>
          <th className={bem("tableHeadCol", "tableHeadCover")}>
            <Icon
              bem={bem}
              icon="album"
              className="tableHeadIcon"
            />
          </th>
          <th className={bem("tableHeadCol")}>Title</th>
          <th className={bem("tableHeadCol")}>Artist</th>
          <th className={bem("tableHeadCol")}>Album</th>
        </tr>
      </thead>
      <tbody className={bem("tableBody")}>
        {children}
      </tbody>
    </table>
  </div>
)

Songs.propTypes = {
  children: node.isRequired
}

export default Songs
