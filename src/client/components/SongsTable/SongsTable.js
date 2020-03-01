import React, { Fragment } from "react"

import Img from "../Img"
import Icon from "../Icon"
import Song from "../Song"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"
import PlayButton from "../PlayButton"
import { Link } from "react-router-dom"
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

          {showColumn("plays") ? (
            <th
              className={bem("head-plays","head-row-col")}
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
              album,
              genres,
              artists,
              duration,
              remixers,
              featuring,
              numOfPlays,
              trackNumber,
            } = song
            return (
              <tr key={id} className={bem("body-row")}>
  
                {showColumn("cover") ? (
                  <td
                    className={bem("body-row-cover","body-row-col")}
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
                    className={bem("body-row-play","body-row-col")}
                    children={(
                      <PlayButton
                        song={song}
                        className={bem("body-row-play-icon")}
                      />
                    )}
                  />
                ) : null}
  
                {showColumn("trackNumber") ? (
                  <td
                    className={bem("body-row-trackNumber","body-row-col")}
                    children={(
                      <span className={bem("body-row-trackNumber-span","body-row-col-span")}>
                        {trackNumber}
                      </span>
                    )} 
                  />
                ) : null}
  
                {showColumn("title") ? (
                  <td
                    className={bem("body-row-title","body-row-col")}
                    children={(
                      <Fragment>
                        <div className={bem("body-row-title-span","body-row-col-span")}>
                          <SongTitle song={song}/>
                        </div>
                        <Song
                          song={song}
                          showCover={false}
                          className={bem("body-row-title-song","body-row-col-span")}
                        />
                      </Fragment>
                    )}
                  />
                ) : null}

                {showColumn("plays") ? (
                  <td
                    className={bem("body-row-plays","body-row-col")}
                    children={(
                      <Link
                        to={`/user/${id}/plays`}
                        children={numOfPlays === 0 ? undefined : numOfPlays}
                        className={bem("body-row-plays-span","body-row-col-span")}
                      />
                    )}
                  />
                ) : null}
  
                {showColumn("add") ? (
                  <td
                    className={bem("body-row-add","body-row-col")}
                    children={(
                      <AddToLibrary
                        doc={song}
                        className={bem("body-row-add-icon")}
                      />
                    )}
                  />
                ) : null}
  
                {showColumn("duration") ? (
                  <td
                    className={bem("body-row-duration","body-row-col")}
                    children={(
                      <span className={bem("body-row-duration-span","body-row-col-span")}>
                        {deserializeDuration(duration)}
                      </span>
                    )}
                  />
                ) : null}
  
                {showColumn("artists") ? (
                  <td
                    className={bem("body-row-artists","body-row-col")}
                    children={(
                      <span className={bem("body-row-col-span")}>
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
                    className={bem("body-row-remixers","body-row-col")}
                    children={(
                      <span className={bem("body-row-col-span")}>
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
                    className={bem("body-row-album","body-row-col")}
                    children={(
                      <span className={bem("body-row-col-span")}>
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
                    className={bem("body-row-genres","body-row-col")}
                    children={(
                      <span className={bem("body-row-col-span")}>
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
                    className={bem("body-row-released","body-row-col")}
                    children={(
                      <span className={bem("body-row-col-span")}>
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
