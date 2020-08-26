import {
	FC,
	useState,
	Fragment,
	useEffect,
	createElement,
	ChangeEventHandler,
} from "react"

import camelCase from "lodash/camelCase"
import { useApolloClient } from "@apollo/client"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import { dataUrlToBlob, blobToDataUrl } from "../helpers"
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

const UploadInput =
	styled("input")({
		display: "none",
	})

const Img: FC<PropTypes> = ({ img, onChange, title, children, className }) => {
	const client = useApolloClient()
	const [ dialog, setDialog ] = useState(false)
	const id = camelCase(title.toLocaleLowerCase()).replace(/[0-9]/g, "")

	const handleOpenDialog = () => setDialog(true)
	const handleCloseDialog = () => setDialog(false)

	const handleFileClick: ChangeEventHandler<HTMLInputElement> = async event => {
		onChange(dataUrlToBlob(await blobToDataUrl(Array.from(event.target.files!)[0])))
		handleCloseDialog()
	}

	const handleSearchClick = async () => {
		onChange(dataUrlToBlob((await client.query<PhotoSearchRes>({
			query: PHOTO_SEARCH,
			fetchPolicy: "no-cache",
			variables: { name: title },
		})).data!.photoSearch))
		handleCloseDialog()
	}

	useEffect(() => {
		const element = document.querySelector<HTMLDivElement>(`#${id}`)!
		const url = img ? URL.createObjectURL(img) : "null"
		element.style.backgroundImage = `url(${url})`
		return () => URL.revokeObjectURL(url)
	})

	return (
		<Fragment>
			<Root
				title={title}
				className={className}
				onClick={handleOpenDialog}
			>
				<Inner
					id={id}
					className="img"
				/>
				{children}
			</Root>
			<Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={dialog}>
				<DialogTitle>
					Subscribe
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Choose upload method.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSearchClick} color="primary">
						Search
					</Button>
					<UploadInput
						multiple
						type="file"
						accept="image/jpeg"
						id="contained-button-file"
						onChange={handleFileClick}
					/>
					<label htmlFor="contained-button-file">
						<Button variant="contained" color="primary" component="span">
							Upload
						</Button>
					</label>
				</DialogActions>
			</Dialog>
		</Fragment>
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