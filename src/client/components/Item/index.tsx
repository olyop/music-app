import { Link } from "react-router-dom"
import { createElement, FC, ReactNode } from "react"

import Img from "../Img"
import PlayButton from "../PlayButton"
import { Doc, BemInputType } from "../../types"
import InLibraryButton from "../InLibraryButton"

import {
	reactBem,
	determineDocPath,
	determineDocNameKey,
	determineDocPhotoKey,
} from "../../helpers"

import "./index.scss"

const bem = reactBem("Item")

type PropTypes = {
	doc: Doc,
	imgDoc?: Doc,
	left?: ReactNode,
	upper: ReactNode,
	lower?: ReactNode,
	right?: ReactNode,
	showPlay?: boolean,
	showInLibrary?: boolean,
	className?: BemInputType,
	infoClassName?: BemInputType,
	inLibClassName?: BemInputType,
}

const Item: FC<PropTypes> = ({
	doc,
	upper,
	left = null,
	lower = null,
	right = null,
	imgDoc = null,
	showPlay = true,
	className = null,
	showInLibrary = true,
	infoClassName = null,
	inLibClassName = null,
}) => (
	<div className={bem(className, "")}>
		{left ? (
			<p
				children={left}
				className={bem("left")}
			/>
		) : null}
		{showPlay ? (
			<PlayButton
				doc={doc}
				className={bem("play")}
			/>
		) : null}
		{imgDoc ? (
			<Link
				className={bem("img-link")}
				to={determineDocPath(imgDoc)}
				title={doc[determineDocNameKey(imgDoc)]}
				children={(
					<Img
						className={bem("img", "Card", "Elevated")}
						url={imgDoc[determineDocPhotoKey(imgDoc)]}
					/>
				)}
			/>
		) : null}
		<div className={bem(infoClassName, "info")}>
			<div className={bem("info-text")}>
				<p
					children={upper}
					className={bem("info-text-upper")}
				/>
				{lower ? (
					<p
						children={lower}
						className={bem("info-text-lower")}
					/>
				) : null}
			</div>
			{showInLibrary ? (
				<InLibraryButton
					doc={doc}
					className={bem(inLibClassName, "info-in-lib")}
				/>
			) : null}
		</div>
		{right ? (
			<p
				children={right}
				className={bem("right")}
			/>
		) : null}
	</div>
)

export default Item