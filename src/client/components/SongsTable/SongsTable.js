import React from "react"

import Icon from "../Icon"
import SongRow from "./SongRow"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { show } from "../../helpers/misc"

import "./SongsTable.scss"

const bem = reactBem("SongsTable")

const SongsTable = ({ songs, columnsToIgnore }) => {
  const showColumn = show(columnsToIgnore)
  return (
    <table className={bem("")}>
      <thead>
        <tr className={bem("row")}>
  
          {showColumn("cover") ? (
            <th className={bem("cover","row-col")}>
              <Icon
                icon="album"
                className={bem("row-col-icon")}
              />
            </th>
          ) : null}

          {showColumn("play") ? (
            <th className={bem("play","row-col")}/>
          ) : null}

          {showColumn("trackNumber") ? (
            <th
              children="#"
              className={bem("trackNumber","row-col")}
            />
          ) : null}
  
          {showColumn("title") ? (
            <th
              children="Title"
              className={bem("title","row-col")}
            />
          ) : null}

          {showColumn("add") ? (
            <th className={bem("add","row-col")}/>
          ) : null}

          {showColumn("duration") ? (
            <th className={bem("duration","row-col")}>
              <Icon
                icon="access_time"
                className={bem("row-col-icon")}
              />
            </th>
          ) : null}
          
          {showColumn("artists") ? (
            <th
              children="Artists"
              className={bem("artists","row-col")}
            />
          ) : null}
  
          {showColumn("remixers") ? (
            <th
              children="Remixers"
              className={bem("remixers","row-col")}
            />
          ) : null}
  
          {showColumn("album") ? (
            <th
              children="Album"
              className={bem("album","row-col")}
            />
          ) : null}
  
          {showColumn("genres") ? (
            <th
              children="Genres"
              className={bem("genres","row-col")}
            />
          ) : null}
  
          {showColumn("released") ? (
            <th
              children="Released"
              className={bem("released","row-col")}
            />
          ) : null}
          
        </tr>
      </thead>
      <tbody className={bem("tableBody")}>
        {songs.map(
          song => (
            <SongRow
              song={song}
              key={song.id}
              columnsToIgnore={columnsToIgnore}
            />
          )
        )}
      </tbody>
    </table>
  )
}

SongsTable.propTypes = propTypes

export default SongsTable
