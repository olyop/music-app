import { createAction } from "@reduxjs/toolkit"

import {
	Modal,
	Settings,
	ListStyle,
	UpdateOrderByPayload,
} from "../types"

const withPayloadType =
	<T>() => (payload: T) => ({ payload })

export const togglePlay =
	createAction("TOGGLE_PLAY")

export const toggleSidebar =
	createAction("TOGGLE_SIDEBAR")

export const toggleShowGenres =
	createAction("TOGGLE_SHOW_GENRES")

export const addError =
	createAction("ADD_ERROR", withPayloadType<Error>())

export const clearModal =
	createAction("CLEAR_MODAL")

export const changeModal =
	createAction("CHANGE_MODAL", withPayloadType<Modal>())

export const addLoading =
	createAction("ADD_LOADING", withPayloadType<string>())

export const removeLoading =
	createAction("REMOVE_LOADING", withPayloadType<string>())

export const updatePlay =
	createAction("UPDATE_PLAY", withPayloadType<boolean>())

export const updateVolume =
	createAction("UPDATE_VOLUME", withPayloadType<number>())

export const updateListStyle =
	createAction("UPDATE_LIST_STYLE", withPayloadType<ListStyle>())

export const updateCurrent =
	createAction("UPDATE_CURRENT", withPayloadType<number>())

export const updateOrderBy =
	createAction("UPDATE_ORDER_BY", withPayloadType<UpdateOrderByPayload>())

export const updateSettings =
	createAction("UPDATE_SETTINGS", withPayloadType<Settings>())