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
	showPlay = true,
	showInLibrary = true,
}: PropTypes<D, I>) => (
	<div className={bem(className, "")}>
		{left && (
			<p
				children={left}
				className={bem("left")}
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
			{determineInLibrary(showInLibrary, doc) && (
				<InLibraryButton
					doc={doc}
					className={bem(inLibClassName, "info-in-lib")}
				/>
			)}
		</div>
		{right && (
			<p
				children={right}
				className={bem("right")}
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
}

export default Item