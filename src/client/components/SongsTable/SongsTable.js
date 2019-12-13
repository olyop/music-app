import React from "react"

import Icon from "../Icon"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./SongsTable.scss"

const bem = reactBem("SongsTable")

const SongsTable = ({ children }) => (
  <table className={bem("")}>
    <thead className={bem("tableHead")}>
      <tr className={bem("tableHeadRow")}>
        <th className={bem("col-album","tableHeadCol","tableHeadCover")}>
          <Icon
            icon="album"
            className={bem("tableHeadIcon")}
          />
        </th>
        <th
          children="Title"
          className={bem("col-title","tableHeadCol")}
        />
        <th className={bem("col-duration","tableHeadCol","tableHeadCover")}>
          <Icon
            icon="access_time"
            className={bem("tableHeadIcon")}
          />
        </th>
        <th
          children="Artists"
          className={bem("col-artists","tableHeadCol")}
        />
        <th
          children="Remixers"
          className={bem("col-remixers","tableHeadCol")}
        />
        <th
          children="Album"
          className={bem("col-album","tableHeadCol")}
        />
        <th
          children="Genres"
          className={bem("col-genres","tableHeadCol")}
        />
        <th
          children="Released"
          className={bem("col-released","tableHeadCol")}
        />
      </tr>
    </thead>
    <tbody className={bem("tableBody")}>
      {children}
    </tbody>
  </table>
)

SongsTable.propTypes = propTypes

export default SongsTable
