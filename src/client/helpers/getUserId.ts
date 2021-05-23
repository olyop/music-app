import jwtDecode from "jwt-decode"

import { User } from "../types"
import { getJwt } from "./getJwt"

export const getUserId =
	() => jwtDecode<Payload>(getJwt()!).userId

type Payload = Pick<User, "userId">