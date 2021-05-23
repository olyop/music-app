import jwtDecode from "jwt-decode"

import { User } from "../types"

export const getJwt =
	() =>
		localStorage.getItem("authorization")

export const setJwt =
	(jwt: string) =>
		localStorage.setItem("authorization", jwt)

export const removeJwt =
	() =>
		localStorage.removeItem("authorization")

export const getUserId =
	() =>
		jwtDecode<Pick<User, "userId">>(getJwt()!).userId