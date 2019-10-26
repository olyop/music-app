import React from "react"

import Icon from "../Icon"

import reactBEM from "@oly_op/react-bem"
import { node } from "prop-types"
import { noop } from "lodash"

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
              onClick={noop}
              className="tableHeadIcon"
            />
          </th>
          <th className={bem("tableHeadCol")}>Title</th>
          <th className={bem("tableHeadCol")}>Artists</th>
          <th className={bem("tableHeadCol")}>Remixers</th>
          <th className={bem("tableHeadCol")}>Album</th>
          <th className={bem("tableHeadCol")}>Released</th>
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
