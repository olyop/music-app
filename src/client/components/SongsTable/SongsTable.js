import React from "react"

import Icon from "../Icon"

import { includes } from "lodash"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./SongsTable.scss"

const bem = reactBem("SongsTable")

const SongsTable = ({ className, children, columnsToIgnore }) => {
  const showColumn = name => !includes(columnsToIgnore, name)
  return (
    <table className={bem({ ignore: true, className },"")}>
      <thead className={bem("head")}>
        <tr className={bem("head-row")}>
  
          {showColumn("cover") ? (
            <th className={bem("head-row-cover","head-row-icon","head-row-col")}>
              <Icon
                icon="album"
                className={bem("head-row-col-icon")}
              />
            </th>
          ) : null}

          {showColumn("play") ? (
            <th className={bem("head-row-play","head-row-icon","head-row-col")}/>
          ) : null}

          {showColumn("trackNumber") ? (
            <th
              children="#"
              className={bem("head-row-track","head-row-col")}
            />
          ) : null}
  
          {showColumn("title") ? (
            <th
              children="Title"
              className={bem("head-row-col")}
            />
          ) : null}

          {showColumn("add") ? (
            <th className={bem("head-row-play","head-row-icon","head-row-col")}/>
          ) : null}

          {showColumn("duration") ? (
            <th className={bem("head-row-duration","head-row-icon","head-row-col")}>
              <Icon
                icon="access_time"
                className={bem("head-row-col-icon")}
              />
            </th>
          ) : null}
          
          {showColumn("artists") ? (
            <th
              children="Artists"
              className={bem("head-row-artists","head-row-col")}
            />
          ) : null}
  
          {showColumn("remixers") ? (
            <th
              children="Remixers"
              className={bem("head-row-col")}
            />
          ) : null}
  
          {showColumn("album") ? (
            <th
              children="Album"
              className={bem("head-row-col")}
            />
          ) : null}
  
          {showColumn("genres") ? (
            <th
              children="Genres"
              className={bem("head-row-col")}
            />
          ) : null}
  
          {showColumn("released") ? (
            <th
              children="Released"
              className={bem("head-row-released","head-row-col")}
            />
          ) : null}
          
        </tr>
      </thead>
      <tbody className={bem("tableBody")}>
        {children}
      </tbody>
    </table>
  )
}

SongsTable.propTypes = propTypes

export default SongsTable
