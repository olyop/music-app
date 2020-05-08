import React, { Fragment } from "react"

import Img from "../Img"
import Albums from "../Albums"
import QueryApi from "../QueryApi"
import { ItemSong } from "../Item"
import InLibraryButton from "../InLibraryButton"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { determinePlural } from "../../helpers"

import GET_ARTIST_PAGE from "../../graphql/queries/getArtistPage.gql"

import "./index.scss"

const bem = reactBem("ArtistPage")

const ArtistPage = () => (
  <div className={bem("")}>
    <QueryApi
      query={GET_ARTIST_PAGE}
      variables={useParams()}
      children={
        ({ artist }) => {
          const { name, photo, songs, albums } = artist
          return (
            <Fragment>
              <Img
                url={photo}
                imgClassName={bem("cover-img")}
                className={bem("cover", "Elevated")}
                children={(
                  <Fragment>
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
                        <Fragment>{determinePlural(songs)}</Fragment>
                        {isEmpty(albums) ? null : (
                          <Fragment>
                            <Fragment>, </Fragment>
                            {albums.length}
                            <Fragment> album</Fragment>
                            {determinePlural(albums)}
                          </Fragment>
                        )}
                      </p>
                    </div>
                    <div className={bem("cover-black")} />
                  </Fragment>
                )}
              />
              <div className="Padding">
                {isEmpty(albums) ? null : (
                  <Fragment>
                    <h2 className={bem("heading")}>Albums</h2>
                    <Albums
                      albums={albums}
                      className="MarginBottom"
                    />
                  </Fragment>
                )}
                {isEmpty(songs) ? null : (
                  <Fragment>
                    <h2 className={bem("heading")}>Songs</h2>
                    <div className="Elevated">
                      {songs.map(
                        song => (
                          <ItemSong
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
  </div>
)

export default ArtistPage
