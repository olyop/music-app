import { createReducer, combineReducers } from "@reduxjs/toolkit"

import {
	addError,
	addLoading,
	updatePlay,
	togglePlay,
	clearModal,
	changeModal,
	updateUserId,
	updateVolume,
	removeLoading,
	updateCurrent,
	updateOrderBy,
	toggleSidebar,
	updateListStyle,
	toggleShowGenres,
} from "./actions"

import {
	Modal,
	Settings,
	ListStyle,
	OrderByDirection,
	SongsOrderByField,
	AlbumsOrderByField,
	GenresOrderByField,
	ArtistsOrderByField,
	UserSongsOrderByField,
	UserArtistsOrderByField,
	PlaylistOrderByField,
	UserPlaylistsOrderByField,
} from "../types"

const userId =
	createReducer<string>("", builder =>
		builder
			.addCase(updateUserId, (state, { payload }) => payload))

const volume =
	createReducer(0, builder =>
		builder
			.addCase(updateVolume, (state, { payload }) => payload))

const current =
	createReducer(0, builder =>
		builder
			.addCase(updateCurrent, (state, { payload }) => payload))

const play =
	createReducer(false, builder =>
		builder
			.addCase(togglePlay, (state: boolean) => !state)
			.addCase(updatePlay, (state, { payload }) => payload))

const sidebar =
	createReducer(false, builder =>
		builder
			.addCase(toggleSidebar, (state: boolean) => !state))

const errors =
	createReducer<Error[]>([], builder =>
		builder
			.addCase(addError, (state, { payload }) => [...state, payload]))

const modal =
	createReducer<Modal | null>(null, builder =>
		builder
			.addCase(clearModal, state => null)
			.addCase(changeModal, (state, { payload }) => payload))

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
	showGenres: false,
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
			})))

const reducer = combineReducers({
	play,
	modal,
	userId,
	volume,
	errors,
	current,
	sidebar,
	loading,
	settings,
})

export default reducer