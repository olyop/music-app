import React, { Fragment } from "react"

import Img from "../Img"
import Icon from "../Icon"
import Song from "../Song"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"
import PlayButton from "../PlayButton"
import AddToLibrary from "../AddToLibrary"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { isEmpty, concat } from "lodash"
import { catalogUrl, show } from "../../helpers/misc"
import deserializeDate from "../../helpers/deserializeDate"
import deserializeDuration from "../../helpers/deserializeDuration"

import "./SongsTable.scss"

const bem = reactBem("SongsTable")

const SongsTable = ({ songs, columnsToIgnore }) => {
  const showColumn = show(columnsToIgnore)
  return (
    <table className={bem("")}>
      <thead className={bem("head")}>
        <tr className={bem("head-row")}>
  
          {showColumn("cover") ? (
            <th
              children={(
                <Icon
                  icon="album"
                  className={bem("head-row-col-icon")}
                />
              )}
              className={bem("head-cover","head-row-col")}
            />
          ) : null}

          {showColumn("play") ? (
            <th
              className={bem("head-play","head-row-col")}
            />
          ) : null}

          {showColumn("trackNumber") ? (
            <th
              children="#"
              className={bem("head-trackNumber","head-row-col")}
            />
          ) : null}
  
          {showColumn("title") ? (
            <th
              children="Title"
              className={bem("head-title","head-row-col")}
            />
          ) : null}

          {showColumn("add") ? (
            <th
              className={bem("head-add","head-row-col")}
            />
          ) : null}

          {showColumn("duration") ? (
            <th
              className={bem("head-duration","head-row-col")}
              children={(
                <Icon
                  icon="access_time"
                  className={bem("head-row-col-icon")}
                />
              )}
            />
          ) : null}
          
          {showColumn("artists") ? (
            <th
              children="Artists"
              className={bem("head-artists","head-row-col")}
            />
          ) : null}
  
          {showColumn("remixers") ? (
            <th
              children="Remixers"
              className={bem("head-remixers","head-row-col")}
            />
          ) : null}
  
          {showColumn("album") ? (
            <th
              children="Album"
              className={bem("head-album","head-row-col")}
            />
          ) : null}
  
          {showColumn("genres") ? (
            <th
              children="Genres"
              className={bem("head-genres","head-row-col")}
            />
          ) : null}
  
          {showColumn("released") ? (
            <th
              children="Released"
              className={bem("head-released","head-row-col")}
            />
          ) : null}
          
        </tr>
      </thead>
      <tbody className={bem("body")}>
        {songs.map(
          song => {
            const {
              id,
              mix,
              title,
              album,
              genres,
              artists,
              duration,
              remixers,
              featuring,
              trackNumber,
            } = song
            return (
              <tr key={id} className={bem("body-row")}>
  
                {showColumn("cover") ? (
                  <td
                    className={bem("body-cover","body-col")}
                    children={(
                      <Img
                        url={catalogUrl(album.id)}
                        children={<PlayButton song={song}/>}
                      />
                    )}
                  />
                ) : null}
  
                {showColumn("play") ? (
                  <td
                    className={bem("body-play","body-col")}
                    children={(
                      <PlayButton
                        song={song}
                        className={bem("body-play-icon")}
                      />
                    )}
                  />
                ) : null}
  
                {showColumn("trackNumber") ? (
                  <td
                    className={bem("body-trackNumber","body-col")}
                    children={(
                      <span className={bem("body-trackNumber-span","body-col-span")}>
                        {trackNumber}
                      </span>
                    )}
                  />
                ) : null}
  
                {showColumn("title") ? (
                  <td
                    className={bem("body-title","body-col")}
                    children={(
                      <Fragment>
                        <div className={bem("body-title-span","body-col-span")}>
                          <SongTitle
                            mix={mix}
                            title={title}
                          />
                        </div>
                        <Song
                          song={song}
                          showCover={false}
                          className={bem("body-title-song","body-col-span")}
                        />
                      </Fragment>
                    )}
                  />
                ) : null}
  
                {showColumn("add") ? (
                  <td
                    className={bem("body-add","body-col")}
                    children={(
                      <AddToLibrary
                        doc={song}
                        className={bem("body-add-icon")}
                      />
                    )}
                  />
                ) : null}
  
                {showColumn("duration") ? (
                  <td
                    className={bem("body-duration","body-col")}
                    children={(
                      <span className={bem("body-duration-span","body-col-span")}>
                        {deserializeDuration(duration)}
                      </span>
                    )}
                  />
                ) : null}
  
                {showColumn("artists") ? (
                  <td
                    className={bem("body-artists","body-col")}
                    children={(
                      <span className={bem("body-col-span")}>
                        <DocLinks
                          path="/artist"
                          ampersand={false}
                          docs={concat(artists,featuring)}
                        />
                      </span>
                    )}
                  />
                ) : null}
  
                {showColumn("remixers") ? (
                  <td
                    className={bem("body-remixers","body-col")}
                    children={(
                      <span className={bem("body-col-span")}>
                        {isEmpty(remixers) ? null : (
                          <DocLinks
                            path="/artist"
                            docs={remixers}
                            ampersand={false}
                          />
                        )}
                      </span>
                    )}
                  />
                ) : null}
  
                {showColumn("album") ? (
                  <td
                    className={bem("body-album","body-col")}
                    children={(
                      <span className={bem("body-col-span")}>
                        <DocLink
                          doc={album}
                          path="/album"
                        />
                      </span>
                    )}
                  />
                ) : null}
  
                {showColumn("genres") ? (
                  <td
                    className={bem("body-genres","body-col")}
                    children={(
                      <span className={bem("body-col-span")}>
                        <DocLinks
                          path="/genre"
                          docs={genres}
                          ampersand={false}
                        />
                      </span>
                    )}
                  />
                ) : null}
  
                {showColumn("released") ? (
                  <td
                    className={bem("body-released","body-col")}
                    children={(
                      <span className={bem("body-col-span")}>
                        {deserializeDate(album.released)}
                      </span>
                    )}
                  />
                ) : null}
  
              </tr>
            )
          },
        )}
      </tbody>
    </table>
  )
}

SongsTable.propTypes = propTypes

export default SongsTable
