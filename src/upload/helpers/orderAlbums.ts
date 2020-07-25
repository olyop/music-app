import orderBy from "lodash/orderBy"
import { AlbumWithSongs } from "../types"

export const orderAlbums = (albums: AlbumWithSongs[]) =>
	orderBy(albums, "released", "desc")