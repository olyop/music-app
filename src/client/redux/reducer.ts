import {
	createReducer,
	combineReducers,
} from "@reduxjs/toolkit"

import {
	addLoading,
	updatePlay,
	togglePlay,
	updateVolume,
	removeLoading,
	updateCurrent,
	updateOrderBy,
	toggleSidebar,
	updateListStyle,
	toggleShowGenres,
	toggleShowReleased,
} from "./actions"

import {
	Settings,
	ListStyle,
	OrderByDirection,
	SongsOrderByField,
	AlbumsOrderByField,
	GenresOrderByField,
	ArtistsOrderByField,
	PlaylistOrderByField,
	UserSongsOrderByField,
	UserArtistsOrderByField,
	UserPlaylistsOrderByField,
} from "../types"

const current =
	createReducer(0, builder =>
		builder
			.addCase(updateCurrent, (_state, { payload }) => payload))

const play =
	createReducer(false, builder =>
		builder
			.addCase(togglePlay, (state: boolean) => !state)
			.addCase(updatePlay, (_state, { payload }) => payload))

const sidebar =
	createReducer(false, builder =>
		builder
			.addCase(toggleSidebar, (state: boolean) => !state))

const loading =
	createReducer<string[]>([], builder =>
		builder
			.addCase(addLoading, (state, { payload }) => [
				...state,
				payload,
			])
			.addCase(removeLoading, (state, { payload }) => (
				state.filter(x => x !== payload)
			)))

const defaultSettings: Settings = {
	volume: 75,
	showGenres: false,
	showReleased: false,
	listStyle: ListStyle.GRID,
	orderBy: {
		songs: {
			field: SongsOrderByField.TITLE,
			direction: OrderByDirection.ASC,
		},
		artists: {
			field: ArtistsOrderByField.NAME,
			direction: OrderByDirection.ASC,
		},
		genres: {
			field: GenresOrderByField.NAME,
			direction: OrderByDirection.ASC,
		},
		albums: {
			direction: OrderByDirection.DESC,
			field: AlbumsOrderByField.RELEASED,
		},
		playlists: {
			direction: OrderByDirection.ASC,
			field: PlaylistOrderByField.TITLE,
		},
		userSongs: {
			direction: OrderByDirection.DESC,
			field: UserSongsOrderByField.DATE_ADDED,
		},
		userArtists: {
			direction: OrderByDirection.DESC,
			field: UserArtistsOrderByField.DATE_ADDED,
		},
		userPlaylists: {
			direction: OrderByDirection.DESC,
			field: UserPlaylistsOrderByField.DATE_ADDED,
		},
	},
}

const settings =
	createReducer<Settings>(defaultSettings, builder =>
		builder
			.addCase(updateVolume, (state, { payload }) => ({
				...state,
				volume: payload,
			}))
			.addCase(toggleShowGenres, state => ({
				...state,
				showGenres: !state.showGenres,
			}))
			.addCase(toggleShowReleased, state => ({
				...state,
				showReleased: !state.showReleased,
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
			})))

const reducer = combineReducers({
	play,
	current,
	sidebar,
	loading,
	settings,
})

export default reducer