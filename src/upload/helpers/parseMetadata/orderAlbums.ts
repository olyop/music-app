import orderBy from "lodash/orderBy"
import { Album } from "../../types"

export const orderAlbums = (albums: Album[]) =>
	orderBy(albums, "released", "desc")