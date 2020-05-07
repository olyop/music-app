import React, { Fragment } from "react"

import Cover from "../Cover"
import QueryApi from "../QueryApi"
import IconText from "../IconText"
import DocLinks from "../DocLinks"
import SongItem from "../SongItem"
import InLibraryButton from "../InLibraryButton"

import { map } from "lodash/fp"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { pipe, deserializeDate } from "../../helpers"
import { songsWithAlbum, determineDiscs, genresFromAlbum } from "./helpers"

import GET_ALBUM_PAGE from "../../graphql/queries/getAlbumPage.gql"

import "./index.scss"

const bem = reactBem("AlbumPage")

const AlbumPage = () => (
  <div className={bem("")}>
    <QueryApi
      query={GET_ALBUM_PAGE}
      variables={useParams()}
      children={
        ({ album }) => {
          const { title, released, artists } = album
          return (
            <Fragment>
              <div>
                <Cover
                  url={album.cover}
                  className={bem("cover", "Card", "Elevated")}
                />
                <IconText
                  text="Shuffle"
                  icon="shuffle"
                  className="Button"
                />
              </div>
              <div>
                <h1 className={bem("title")}>
                  <span className={bem("title-text")}>{title}</span>
                  <InLibraryButton
                    doc={album}
                    className={bem("title-add")}
                  />
                </h1>
                <h2 className={bem("artists")}>
                  <DocLinks
                    ampersand
                    path="/artist"
                    docs={artists}
                  />
                </h2>
                <h3 className={bem("info")}>
                  <DocLinks
                    ampersand
                    path="/genre"
                    docs={genresFromAlbum(album)}
                  />
                  <Fragment> - </Fragment>
                  {deserializeDate(released)}
                </h3>
                <div className={bem("discs")}>
                  {pipe(album)(
                    songsWithAlbum,
                    determineDiscs,
                    map(({ number, songs }) => (
                      <div className={bem("disc")} key={number}>
                        <h4
                          children={`Disc ${number}`}
                          className={bem("disc-number")}
                        />
                        <div className="Elevated">
                          {songs.map(
                            song => (
                              <SongItem
                                song={song}
                                showDuration
                                showTrackNumber
                                key={song.songId}
                                showCover={false}
                              />
                            ),
                          )}
                        </div>
                      </div>
                    )),
                  )}
                </div>
              </div>
            </Fragment>
          )
        }
      }
    />
  </div>
)

export default AlbumPage
