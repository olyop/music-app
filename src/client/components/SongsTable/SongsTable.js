import React from "react"

import Icon from "../Icon"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { showColumn } from "../../helpers/misc"

import "./SongsTable.scss"

const bem = reactBem("SongsTable")

const SongsTable = ({ className, children, columnsToIgnore }) => {
  const show = showColumn(columnsToIgnore)
  return (
    <table className={bem({ ignore: true, className },"")}>
      <thead className={bem("head")}>
        <tr className={bem("head-row")}>
  
          {show("cover") ? (
            <th className={bem("head-row-cover","head-row-icon","head-row-col")}>
              <Icon
                icon="album"
                className={bem("head-row-col-icon")}
              />
            </th>
          ) : null}

          {show("play") ? (
            <th className={bem("head-row-play","head-row-icon","head-row-col")}/>
          ) : null}

          {show("trackNumber") ? (
            <th
              children="#"
              className={bem("head-row-track","head-row-col")}
            />
          ) : null}
  
          {show("title") ? (
            <th
              children="Title"
              className={bem("head-row-col")}
            />
          ) : null}

          {show("add") ? (
            <th className={bem("head-row-play","head-row-icon","head-row-col")}/>
          ) : null}

          {show("duration") ? (
            <th className={bem("head-row-duration","head-row-icon","head-row-col")}>
              <Icon
                icon="access_time"
                className={bem("head-row-col-icon")}
              />
            </th>
          ) : null}
          
          {show("artists") ? (
            <th
              children="Artists"
              className={bem("head-row-artists","head-row-col")}
            />
          ) : null}
  
          {show("remixers") ? (
            <th
              children="Remixers"
              className={bem("head-row-col")}
            />
          ) : null}
  
          {show("album") ? (
            <th
              children="Album"
              className={bem("head-row-col")}
            />
          ) : null}
  
          {show("genres") ? (
            <th
              children="Genres"
              className={bem("head-row-col")}
            />
          ) : null}
  
          {show("released") ? (
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
