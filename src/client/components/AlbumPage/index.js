import React, { Fragment } from "react"

import QueryApi from "../QueryApi"
import Cover from "../Cover"
import IconText from "../IconText"
import DocLinks from "../DocLinks"
import SongsTable from "../SongsTable"
import InLibraryButton from "../InLibraryButton"

import { map } from "lodash/fp"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { pipe, deserializeDate } from "../../helpers"
import { songsWithAlbum, determineDiscs, genresFromAlbum } from "./helpers"

import GET_ALBUM_PAGE from "../../graphql/queries/getAlbumPage.graphql"

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
              <Cover
                url={album.cover}
                className={bem("cover")}
              />
              <h2 className={bem("title")}>
                <span className={bem("title-text")}>{title}</span>
                <InLibraryButton
                  doc={album}
                  className={bem("title-add")}
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
              <h4 className={bem("artists")}>
                <DocLinks
                  ampersand
                  path="/artist"
                  docs={artists}
                />
              </h4>
              <div className={bem("controls")}>
                <IconText
                  text="Shuffle"
                  icon="shuffle"
                  className={bem("controls-shuffle")}
                />
              </div>
              <div className={bem("discs")}>
                {pipe(album)(
                  songsWithAlbum,
                  determineDiscs,
                  map(
                    disc => (
                      <div className={bem("disc")} key={disc.number}>
                        <p className={bem("disc-number")}>{`Disc ${disc.number}`}</p>
                        <SongsTable
                          songs={disc.songs}
                          orderByInit={{ field: "trackNumber", order: true }}
                          columnsToIgnore={["album", "numOfPlays", "released", "dateAdded"]}
                        />
                      </div>
                    ),
                  ),
                )}
              </div>
            </Fragment>
          )
        }
      }
    />
  </div>
)

export default AlbumPage
