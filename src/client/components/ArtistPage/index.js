import React, { Fragment } from "react"

import Img from "../Img"
import List from "../List"
import Song from "../Song"
import Album from "../Album"
import QueryApi from "../QueryApi"
import InLibraryButton from "../InLibraryButton"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { determinePlural } from "../../helpers"

import GET_ARTIST_PAGE from "../../graphql/queries/getArtistPage.gql"

import "./index.scss"

const bem = reactBem("ArtistPage")

const ArtistPage = () => (
  <QueryApi
    query={GET_ARTIST_PAGE}
    variables={useParams()}
    className={bem("")}
    children={
      ({ artist }) => {
        const { name, photo, songs, albums } = artist
        return (
          <Fragment>
            <Img
              url={photo}
              imgClassName={bem("cover-img")}
              className={bem("cover", "Elevated")}
            >
              <div className={bem("cover-content", "Padding")}>
                <h1 className={bem("cover-content-name")}>
                  <span className={bem("cover-content-name-text")}>{name}</span>
                  <InLibraryButton
                    doc={artist}
                    className={bem("cover-content-name-add")}
                  />
                </h1>
                <p className={bem("cover-content-stats")}>
                  {songs.length}
                  <Fragment> song</Fragment>
                  <Fragment>{determinePlural(songs.length)}</Fragment>
                  {isEmpty(albums) ? null : (
                    <Fragment>
                      <Fragment>, </Fragment>
                      {albums.length}
                      <Fragment> album</Fragment>
                      {determinePlural(albums.length)}
                    </Fragment>
                  )}
                </p>
              </div>
              <div className={bem("cover-black")} />
            </Img>
            <div className="Padding">
              {isEmpty(albums) ? null : (
                <Fragment>
                  <h2 className={bem("heading")}>Albums</h2>
                  <List className="MarginBottom">
                    {albums.map(
                      album => (
                        <Album
                          album={album}
                          key={album.albumId}
                        />
                      ),
                    )}
                  </List>
                </Fragment>
              )}
              {isEmpty(songs) ? null : (
                <Fragment>
                  <h2 className={bem("heading")}>Songs</h2>
                  <div className="Elevated">
                    {songs.map(
                      song => (
                        <Song
                          song={song}
                          key={song.songId}
                          className="PaddingHalf Hover ItemBorder"
                        />
                      ),
                    )}
                  </div>
                </Fragment>
              )}
            </div>
          </Fragment>
        )
      }
    }
  />
)

export default ArtistPage
