import { createElement, FC } from "react"

import Icon from "../Icon"
import { Handler } from "../../types"

const InLibraryButton: FC<PropTypes> = ({ inLibrary, onClick, className }) => (
	<Icon
		onClick={onClick}
		className={className}
		icon={inLibrary ? "done" : "add"}
		title={`${inLibrary ? "Remove from" : "Add to"} Library`}
	/>
)

interface PropTypes {
	onClick?: Handler,
	inLibrary: boolean,
	className?: string,
}

export default InLibraryButton