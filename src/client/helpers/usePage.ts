import { useRef, useEffect } from "react"

export const usePage = () => {
	const page = useRef(1)
	useEffect(() => () => {
		page.current = 1
	})
	return page
}