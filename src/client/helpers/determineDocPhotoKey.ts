type IType = { __typename: string }

type RType = "cover" | "photo"

const determineDocPhotoKey = ({ __typename }: IType): RType =>
	(__typename === "Album" ? "cover" : "photo")

export default determineDocPhotoKey