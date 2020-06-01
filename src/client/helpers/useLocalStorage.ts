import { useEffect, useState, Dispatch, SetStateAction } from "react"

type ReturnType<T> = [ T, Dispatch<SetStateAction<T>> ]

export const useLocalStorage = <T>(key: string, init: T): ReturnType<T> => {
	const [ state, setState ] = useState(() => {
		const value = localStorage.getItem(key)
		return value ? <T>JSON.parse(value) : init
	})
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	}, [ state, key ])
	return [ state, setState ]
}