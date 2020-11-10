import { createElement, FC } from "react"

import Icon from "../../Icon"
import { InLibraryDoc } from "../../../types"
import { useInLibrary } from "../../../helpers"

const InLibraryButton: FC<PropTypes> = ({ doc, className }) => {
	const [ handleClick, { loading, inLibrary } ] = useInLibrary(doc)
	return (
		<Icon
			className={className}
			icon={inLibrary ? "done" : "add"}
			onClick={loading ? undefined : handleClick}
			title={`${inLibrary ? "Remove from" : "Add to"} Library`}
		/>
	)
}

interface PropTypes {
	doc: InLibraryDoc,
	className?: string,
}

export default InLibraryButton