import { createElement, FC } from "react"

import Icon from "../Icon"

const InLibraryButton: FC<PropTypes> = ({ inLibrary, onClick, className }) => (
	<Icon
		onClick={onClick}
		className={className}
		icon={inLibrary ? "done" : "add"}
		title={`${inLibrary ? "Remove from" : "Add to"} Library`}
	/>
)

interface PropTypes {
	inLibrary: boolean,
	className?: string,
	onClick: () => void,
}

export default InLibraryButton