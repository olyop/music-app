import React, { Fragment } from "react"
import Cover from "../Cover"
import QueryApi from "../QueryApi"
import IconText from "../IconText"
import DocLinks from "../DocLinks"
import { ItemSong } from "../Item"
import InLibraryButton from "../InLibraryButton"

import { map } from "lodash/fp"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { pipe, deserializeDate, deserializeDuration } from "../../helpers"
import { songsWithAlbum, determineDiscs, genresFromAlbum } from "./helpers"

import GET_ALBUM_PAGE from "../../graphql/queries/getAlbumPage.gql"

import "./index.scss"

const bem = reactBem("AlbumPage")

const AlbumPage = () => (
  <div className={bem("", "Padding")}>
    <QueryApi
      query={GET_ALBUM_PAGE}
      variables={useParams()}
      children={
        ({ album }) => {
          const { title, released, artists, totalDuration } = album
          return (
            <Fragment>
              <div>
                <Cover
                  url={album.cover}
                  className="Card MarginBottom Elevated"
                />
                <IconText
                  text="Shuffle"
                  icon="shuffle"
                  className={bem("shuffle", "Button")}
                />
              </div>
              <div>
                <h1 className={bem("title")}>
                  <span>{title}</span>
                  <InLibraryButton
                    doc={album}
                    className={bem("title-add")}
                  />
                </h1>
                <h3 className={bem("genres")}>
                  <DocLinks ampersand docs={genresFromAlbum(album)} />
                </h3>
                <h2 className={bem("artists", "MarginBottom")}>
                  <DocLinks ampersand docs={artists} />
                </h2>
                <div className={bem("discs", "MarginBottom")}>
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
                              <ItemSong
                                song={song}
                                showTrackNumber
                                key={song.songId}
                                showCover={false}
                                className="PaddingHalf Hover ItemBorder"
                              />
                            ),
                          )}
                        </div>
                      </div>
                    )),
                  )}
                </div>
                <p className={bem("footer-text")}>
                  <Fragment>Duration: </Fragment>
                  {deserializeDuration(totalDuration)}
                  <Fragment> &#8211; </Fragment>
                  <Fragment>Released: </Fragment>
                  {deserializeDate(released)}
                </p>
              </div>
            </Fragment>
          )
        }
      }
    />
  </div>
)

export default AlbumPage
