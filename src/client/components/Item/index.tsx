import { Link } from "react-router-dom"
import { createElement, ReactNode, ReactElement } from "react"

import Img from "../Img"
import PlayButton from "../PlayButton"
import InLibraryButton from "../InLibraryButton"
import { BemInputType, UserDoc } from "../../types"

import {
	reactBem,
	determineDocPath,
	determineDocName,
	determineDocPhoto,
} from "../../helpers"

import "./index.scss"

type TProps<D, I> = {
	doc: D,
	imgDoc?: I,
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

const bem = reactBem("Item")

const Item = <D extends UserDoc, I extends UserDoc = UserDoc>({
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
}: TProps<D, I>): ReactElement => (
	<div className={bem(className, "")}>
		{left && (
			<p
				children={left}
				className={bem("left")}
			/>
		)}
		{showPlay && (
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
			{showInLibrary && (
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

export default Item