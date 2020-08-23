import camelCase from "lodash/camelCase"
import { useApolloClient } from "@apollo/client"
import { useEffect, createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

import { dataUrlToBlob } from "../helpers"
import PHOTO_SEARCH from "../graphql/photoSearch.gql"

const Root =
	styled(Box)({
		overflow: "hidden",
		position: "relative",
		"&::before": {
			content: "",
			display: "block",
			paddingTop: "100%",
		},
	})

const Inner =
	styled(Box)({
		top: 0,
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "50% 50%",
	})

const Img: FC<PropTypes> = ({ img, onChange, title, children, className }) => {
	const client =
		useApolloClient()
	const id =
		camelCase(title.toLocaleLowerCase()).replace(/[0-9]/g, "")
	const handleClick = async () =>
		onChange(dataUrlToBlob((await client.query<PhotoSearchRes>({
			query: PHOTO_SEARCH,
			fetchPolicy: "no-cache",
			variables: { name: title },
		})).data!.photoSearch))
	useEffect(() => {
		const element = document.querySelector<HTMLDivElement>(`#${id}`)!
		const url = img ? URL.createObjectURL(img) : "null"
		element.style.backgroundImage = `url(${url})`
		return () => URL.revokeObjectURL(url)
	})
	return (
		<Root
			title={title}
			onClick={handleClick}
			className={className}
		>
			<Inner
				className="img"
				id={id}
			/>
			{children}
		</Root>
	)
}

interface PhotoSearchRes {
	photoSearch: string,
}

interface PropTypes {
	title: string,
	img: Blob | null,
	className?: string,
	onChange: (img: Blob) => void,
}

export default Img