import { Link } from "react-router-dom"
import { createElement, ReactNode } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	Doc,
	Modal,
	UserDoc,
	InLibraryDoc,
} from "../../types"

import {
	determineDocPath,
	determineDocName,
	determineDocPhoto,
} from "../../helpers"

import Img from "../Img"
import Icon from "../Icon"
import PlayButton from "../PlayButton"
import InLibraryButton from "./InLibraryButton"
import { useDispatch, changeModal } from "../../redux"

import "./index.scss"

const bem = createBem("Item")

const showInLibrary =
	(hideInLibrary: boolean, doc: Doc): doc is InLibraryDoc => !hideInLibrary

const determineShowPlay =
	(hidePlay: boolean, doc: Doc): doc is UserDoc => !hidePlay

const Item = <D extends Doc, I extends Doc = Doc>({
	doc,
	left,
	lower,
	right,
	upper,
	modal,
	imgDoc,
	className,
	infoClassName,
	iconClassName,
	rightClassName,
	hidePlay = false,
	hideInLibrary = false,
}: PropTypes<D, I>) => {
	const dispatch = useDispatch()
	const handleMore = () => modal && dispatch(changeModal(modal))
	return (
		<div className={bem(className)}>
			<div className={bem("")}>
				{left && (
					<p
						children={left}
						className={bem("left", "Text")}
					/>
				)}
				{determineShowPlay(hidePlay, doc) && (
					<PlayButton
						doc={doc}
						className={bem(iconClassName, "play")}
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
					<div className={bem("info-left")}>
						<p
							children={upper}
							className={bem("info-left-upper", "Text2")}
						/>
						{lower && (
							<p
								children={lower}
								className={bem("info-left-lower", "Text")}
							/>
						)}
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
						className={bem(iconClassName, "add")}
					/>
				)}
				<Icon
					icon="more_vert"
					onClick={handleMore}
					className={bem(iconClassName, "more")}
				/>
			</div>
		</div>
	)
}

interface PropTypes<Doc, ImgDoc> extends BemPropTypes {
	doc: Doc,
	modal?: Modal,
	imgDoc?: ImgDoc,
	left?: ReactNode,
	upper: ReactNode,
	lower?: ReactNode,
	right?: ReactNode,
	hidePlay?: boolean,
	hideInLibrary?: boolean,
	infoClassName?: BemInput,
	iconClassName?: BemInput,
	rightClassName?: BemInput,
}

export default Item