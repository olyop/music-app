import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import {
	getCatalogImg,
	determineDocId,
	determineDocName,
	determineDocPath,
} from "../../../helpers"

import Cover from "../../Cover"
import DocLink from "../../DocLink"
import { Doc, Handler } from "../../../types"

import "./index.scss"

const bem = createBem("ModalHeader")

const ModalHeader: FC<ModalHeaderPropTypes> = ({
	imgDoc,
	textDoc,
	onClose,
}) => {
	const imgDocTemp = imgDoc || textDoc
	return (
		<div className="ItemBorder FlexListCenter PaddingHalf">
			<Cover
				onClick={onClose}
				link={determineDocPath(imgDocTemp)}
				title={determineDocName(imgDocTemp)}
				url={getCatalogImg(determineDocId(imgDocTemp))}
				className={bem("img", "MarginRightHalf BorderRadius")}
			/>
			<DocLink
				doc={textDoc}
				onClick={onClose}
				className={bem("text", "Heading2")}
			/>
		</div>
	)
}

export interface ModalHeaderPropTypes {
	imgDoc?: Doc,
	textDoc: Doc,
	onClose?: Handler,
}

export default ModalHeader