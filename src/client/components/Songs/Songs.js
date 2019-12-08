import React from "react"

import Icon from "../Icon"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Songs.scss"

const bem = reactBem("Songs")

const Songs = ({ children }) => (
  <div className={bem("")}>
    <table className={bem("table")}>
      <thead className={bem("tableHead")}>
        <tr className={bem("tableHeadRow")}>
          <th className={bem("tableHeadCol","tableHeadCover")}>
            <Icon
              icon="album"
              className={bem("tableHeadIcon")}
            />
          </th>
          <th
            children="Title"
            className={bem("tableHeadCol")}
          />
          <th className={bem("tableHeadCol","tableHeadCover")}>
            <Icon
              icon="access_time"
              className={bem("tableHeadIcon")}
            />
          </th>
          <th
            children="Artists"
            className={bem("tableHeadCol")}
          />
          <th
            children="Remixers"
            className={bem("tableHeadCol")}
          />
          <th
            children="Album"
            className={bem("tableHeadCol")}
          />
          <th
            children="Genres"
            className={bem("tableHeadCol")}
          />
          <th
            children="Released"
            className={bem("tableHeadCol")}
          />
        </tr>
      </thead>
      <tbody className={bem("tableBody")}>
        {children}
      </tbody>
    </table>
  </div>
)

Songs.propTypes = propTypes

export default Songs
