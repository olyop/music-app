import { createAction } from "@reduxjs/toolkit"

import { ListStyle, UpdateOrderByPayload } from "../types"

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

export const addLoading =
	createAction("ADD_LOADING", withPayloadType<string>())

export const updatePlay =
	createAction("UPDATE_PLAY", withPayloadType<boolean>())

export const updateVolume =
	createAction("UPDATE_VOLUME", withPayloadType<number>())

export const updateCurrent =
	createAction("UPDATE_CURRENT", withPayloadType<number>())

export const removeLoading =
	createAction("REMOVE_LOADING", withPayloadType<string>())

export const updateUserId =
	createAction("UPDATE_USER_ID", withPayloadType<string>())

export const updateListStyle =
	createAction("UPDATE_LIST_STYLE", withPayloadType<ListStyle>())

export const updateOrderBy =
	createAction("UPDATE_ORDER_BY", withPayloadType<UpdateOrderByPayload>())