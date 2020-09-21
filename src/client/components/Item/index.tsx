import { Link } from "react-router-dom"
import { createElement, Fragment, ReactNode, useState } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	determineDocPath,
	determineDocName,
	determineDocPhoto,
} from "../../helpers"

import Img from "../Img"
import Icon from "../Icon"
import Modal from "../Modal"
import PlayButton from "../PlayButton"
import { Doc, UserDoc } from "../../types"
import InLibraryButton from "../InLibraryButton"

import "./index.scss"

const showInLibrary =
	(hideInLibrary: boolean, doc: Doc): doc is UserDoc => !hideInLibrary
const determineShowPlay =
	(showPlay: boolean, doc: Doc): doc is UserDoc => showPlay

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
	hideInLibrary = false,
	inLibrarySticky = false,
}: PropTypes<D, I>) => {
	const [ more, setMore ] = useState(false)
	const openMore = () => setMore(true)
	const closeMore = () => setMore(false)
	return (
		<Fragment>
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
				{showInLibrary(hideInLibrary, doc) && (
					<InLibraryButton
						doc={doc}
						className={bem(inLibClassName, "in-lib")}
						style={{ display: inLibrarySticky ? "block" : undefined }}
					/>
				)}
				<Icon
					icon="more_vert"
					onClick={openMore}
					className={bem(inLibClassName, "in-lib")}
					style={{ display: inLibrarySticky ? "block" : undefined }}
				/>
			</div>
			{more && (
				<Modal
					onClick={closeMore}
					className={bem("modal")}
				>
					<button
						type="button"
						children="Next"
						className={bem("modal-button", "PaddingHalf Text2")}
					/>
					<button
						type="button"
						children="Later"
						className={bem("modal-button", "PaddingHalf Text2")}
					/>
					<button
						type="button"
						children="Queue"
						className={bem("modal-button", "PaddingHalf Text2")}
					/>
					<button
						type="button"
						children="Shuffle"
						className={bem("modal-button", "PaddingHalf Text2")}
					/>
				</Modal>
			)}
		</Fragment>
	)
}

interface PropTypes<Doc, ImgDoc> extends BemPropTypes {
	doc: Doc,
	imgDoc?: ImgDoc,
	left?: ReactNode,
	upper: ReactNode,
	lower?: ReactNode,
	right?: ReactNode,
	showPlay?: boolean,
	hideInLibrary?: boolean,
	infoClassName?: BemInput,
	inLibClassName?: BemInput,
	rightClassName?: BemInput,
	inLibrarySticky?: boolean,
}

export default Item