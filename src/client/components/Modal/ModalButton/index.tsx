import { Link } from "react-router-dom"
import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment, AnchorHTMLAttributes } from "react"

import Button from "../../Button"
import { Handler } from "../../../types"

import "./index.scss"

const bem = createBem("ModalButton")

const ModalButton: FC<ModalButtonPropTypes> = ({
	text,
	icon,
	link,
	handler,
	externalLink,
	externalLinkProps,
}) => {
	const handleClick =
		() => handler && handler()

	const classNameTemp =
		bem(
			"",
			link ? "Button" : undefined,
			"PaddingHalf",
		)

	const jsx = (
		<Button
			key={text}
			icon={icon}
			text={text}
			onClick={handleClick}
			spanClassName={bem("span")}
			className={link ? bem("none") : classNameTemp}
		/>
	)

	return link ? (
		<Fragment>
			{externalLink ? (
				<a
					children={jsx}
					href={link}
					className={classNameTemp}
					{...externalLinkProps}
				/>
			) : (
				<Link
					to={link}
					children={jsx}
					onClick={handleClick}
					className={classNameTemp}
				/>
			)}
		</Fragment>
	) : jsx
}

export interface ModalButtonPropTypes {
	text: string,
	icon?: string,
	link?: string,
	handler?: Handler,
	externalLink?: boolean,
	externalLinkProps?: AnchorHTMLAttributes<HTMLAnchorElement>,
}

export default ModalButton