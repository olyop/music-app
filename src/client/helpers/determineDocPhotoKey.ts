import { Doc } from "../types"

export const determineDocPhotoKey = ({ __typename }: Doc): "cover" | "photo" =>
	(__typename === "Album" ? "cover" : "photo")