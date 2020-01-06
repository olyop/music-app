import React from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"
import Loading from "../Loading"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/user"

import gql from "graphql-tag"
import { isUndefined } from "lodash"
import { useQuery, useMutation } from "@apollo/react-hooks"

import GET_USER from "./getUser.graphql"
import UPDATE_USERS_SONGS from "./updateUserSongs.graphql"
import UPDATE_NOW_PLAYING from "./updateNowPlaying.graphql"

const id = "5e11e4aa8e0f023c5007dff9"

const App = () => {
  const userQueryOptions = { variables: { id } }
  const [ mutateUserSongs ] = useMutation(UPDATE_USERS_SONGS)
  const [ mutateNowPlaying ] = useMutation(UPDATE_NOW_PLAYING)
  const { data, loading, error, client } = useQuery(GET_USER, userQueryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { user } = data
    const { id: userId } = user
    const updateNowPlaying = nowPlaying => {
      const { id: songId } = nowPlaying
      mutateNowPlaying({ variables: { userId, songId } })
      client.writeQuery({
        query: GET_USER,
        data: { user: { ...user, nowPlaying } },
      })
    }
    const updateUserSongs = song => {
      const { id: songId } = song
      mutateUserSongs({ variables: { userId, songId } })
      client.writeFragment({
        id: userId,
        fragment: gql`
          fragment updateUserSongs on User {
            songs
          }
        `,
        data: {
          __typename: "User",
          songs: [...user.songs, song],
        },
      })
    }
    const userCtxInit = {
      user,
      updateUserSongs,
      updateNowPlaying,
    }
    return (
      <UserCtx.Provider value={userCtxInit}>
        <Header/>
        <Pages/>
        <Player/>
      </UserCtx.Provider>
    )
  }
}

export default App
