import { Link } from "react-router-dom"
import { createElement, ReactNode } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import Img from "../Img"
import PlayButton from "../PlayButton"
import { Doc, UserDoc } from "../../types"
import InLibraryButton from "../InLibraryButton"
import { determineDocPath, determineDocName, determineDocPhoto } from "../../helpers"

import "./index.scss"

const determineInLibrary = (inLib: boolean, _doc: Doc): _doc is UserDoc => inLib
const determineShowPlay = (showPlay: boolean, _doc: Doc): _doc is UserDoc => showPlay

const bem = createBem("Item")

const Item = <D extends Doc, I extends Doc = Doc>({
	doc,
	left,
	lower,
	right,
	upper,
	imgDoc,
	className,
	infoClassName,
	inLibClassName,
	rightClassName,
	showPlay = true,
	showInLibrary = true,
	inLibrarySticky = false,
}: PropTypes<D, I>) => (
	<div className={bem(className, "", "FlexList")}>
		{left && (
			<p
				children={left}
				className={bem("left", "Text")}
			/>
		)}
		{determineShowPlay(showPlay, doc) && (
			<PlayButton
				doc={doc}
				className={bem("play")}
			/>
		)}
		{imgDoc && (
			<Link
				className={bem("img-link")}
				to={determineDocPath(imgDoc)}
				title={determineDocName(imgDoc)}
				children={(
					<Img
						url={determineDocPhoto(imgDoc)}
						className={bem("img", "Card", "Elevated")}
					/>
				)}
			/>
		)}
		<div className={bem(infoClassName, "info", "FlexList")}>
			<div className={bem("info-left")}>
				<p
					children={upper}
					className={bem("info-left-upper", "Text2")}
				/>
				{lower ? (
					<p
						children={lower}
						className={bem("info-left-lower", "Text")}
					/>
				) : null}
			</div>
			{right && (
				<p
					children={right}
					className={bem(rightClassName, "info-right", "Text")}
				/>
			)}
		</div>
		{determineInLibrary(showInLibrary, doc) && (
			<InLibraryButton
				doc={doc}
				className={bem(inLibClassName, "in-lib")}
				style={{ display: inLibrarySticky ? "block" : undefined }}
			/>
		)}
	</div>
)

interface PropTypes<Doc, ImgDoc> {
	doc: Doc,
	imgDoc?: ImgDoc,
	left?: ReactNode,
	upper: ReactNode,
	lower?: ReactNode,
	right?: ReactNode,
	showPlay?: boolean,
	className?: BemInput,
	showInLibrary?: boolean,
	infoClassName?: BemInput,
	inLibClassName?: BemInput,
	rightClassName?: BemInput,
	inLibrarySticky?: boolean,
}

export default Item