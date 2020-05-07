import React, { Fragment } from "react"

import Img from "../Img"
import Album from "../Album"
import QueryApi from "../QueryApi"
import SongItem from "../SongItem"
import InLibraryButton from "../InLibraryButton"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { determinePlural, determineDocIdKey } from "../../helpers"

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
                    <div className={bem("cover-content", "Space")}>
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
              <div className="Space">
                {isEmpty(albums) ? null : (
                  <div className={bem("albums", "Grid", "SpaceBottom")}>
                    {albums.map(
                      album => (
                        <Album
                          album={album}
                          key={album[determineDocIdKey(album)]}
                        />
                      ),
                    )}
                  </div>
                )}
                {isEmpty(songs) ? null : (
                  <div className="Elevated">
                    {songs.map(
                      song => (
                        <SongItem
                          song={song}
                          showDuration
                          key={song.songId}
                        />
                      ),
                    )}
                  </div>
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
