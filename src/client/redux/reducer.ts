import { createReducer, combineReducers } from "@reduxjs/toolkit"

import {
	updatePlay,
	togglePlay,
	updateVolume,
	updateCurrent,
	updateOrderBy,
	toggleSidebar,
	updateLoading,
	updateListStyle,
	toggleShowGenres,
	toggleShowVolume,
} from "./actions"

import {
	Settings,
	ListStyle,
	OrderByDirection,
	SongsOrderByField,
	AlbumsOrderByField,
	ArtistsOrderByField,
	UserSongsOrderByField,
	UserAlbumsOrderByField,
	UserArtistsOrderByField,
} from "../types"

const toggle = (x: boolean) => !x

const userId =
	createReducer(process.env.USER_ID!, {})

const volume = createReducer(0, builder =>
	builder.addCase(updateVolume, (state, { payload }) => payload))

const current = createReducer(0, builder =>
	builder.addCase(updateCurrent, (state, { payload }) => payload))

const play = createReducer(false, builder =>
	builder.addCase(togglePlay, toggle)
				 .addCase(updatePlay, (state, { payload }) => payload))

const sidebar = createReducer(false, builder =>
	builder.addCase(toggleSidebar, toggle))

const loading = createReducer(false, builder =>
	builder.addCase(updateLoading, (state, { payload }) => payload))

const showVolume = createReducer(false, builder =>
	builder.addCase(toggleShowVolume, toggle))

const settings =
	createReducer<Settings>(
		{
			showGenres: false,
			listStyle: ListStyle.GRID,
			orderBy: {
				songs: {
					field: SongsOrderByField.TITLE,
					direction: OrderByDirection.ASC,
				},
				albums: {
					direction: OrderByDirection.DESC,
					field: AlbumsOrderByField.RELEASED,
				},
				artists: {
					field: ArtistsOrderByField.NAME,
					direction: OrderByDirection.ASC,
				},
				userSongs: {
					direction: OrderByDirection.DESC,
					field: UserSongsOrderByField.DATE_ADDED,
				},
				userAlbums: {
					direction: OrderByDirection.DESC,
					field: UserAlbumsOrderByField.DATE_ADDED,
				},
				userArtists: {
					direction: OrderByDirection.DESC,
					field: UserArtistsOrderByField.DATE_ADDED,
				},
			},
		},
		builder => builder
			.addCase(toggleShowGenres, state => ({
				...state,
				showGenres: !state.showGenres,
			}))
			.addCase(updateListStyle, (state, { payload }) => ({
				...state,
				listStyle: payload,
			}))
			.addCase(updateOrderBy, (state, { payload }) => ({
				...state,
				orderBy: {
					...state.orderBy,
					[payload.settingsKey]: {
						...state.orderBy[payload.settingsKey],
						[payload.key]: payload.val,
					},
				},
			})),
	)

const reducer = combineReducers({
	play,
	userId,
	volume,
	current,
	sidebar,
	loading,
	settings,
	showVolume,
})

export default reducer