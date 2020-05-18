import React, { Fragment } from "react"

import {
  pipe,
  determineDiscs,
  deserializeDate,
  deserializeDuration,
} from "../../helpers"

import Song from "../Song"
import Cover from "../Cover"
import Button from "../Button"
import QueryApi from "../QueryApi"
import DocLinks from "../DocLinks"
import InLibraryButton from "../InLibraryButton"

import { map } from "lodash/fp"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { songsWithAlbum, genresFromAlbum } from "./helpers"

import GET_ALBUM_PAGE from "../../graphql/queries/getAlbumPage.gql"

import "./index.scss"

const bem = reactBem("AlbumPage")

const AlbumPage = () => (
  <QueryApi
    query={GET_ALBUM_PAGE}
    variables={useParams()}
    className={bem("", "Padding")}
    children={({ album }) => {
      const { title, released, artists, totalDuration } = album
      return (
        <Fragment>
          <div>
            <Cover
              url={album.cover}
              className="Card MarginBottom Elevated"
            />
            <Button text="Shuffle"/>
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
              <DocLinks docs={genresFromAlbum(album)} />
            </h3>
            <h2 className={bem("artists", "MarginBottom")}>
              <DocLinks docs={artists} />
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
                          <Song
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
              {deserializeDuration(totalDuration, true)}
              <Fragment> - </Fragment>
              {deserializeDate(released)}
            </p>
          </div>
        </Fragment>
      )
    }}
  />
)

export default AlbumPage
