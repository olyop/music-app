import { Dispatch, SetStateAction, useEffect, useState } from "react"

type ReturnType<T> = [
  T | null,
  Dispatch<SetStateAction<T | null>>
]

export const useLocalStorage = <T,>(
  key: string,
  initialValue?: T,
): ReturnType<T> => {
  const [state, setState] = useState<T | null>(() => {
    if (!initialValue) return null
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (err) {
      return initialValue
    }
  })

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state))
      } catch (err) {
        console.log(err)
      }
    }
  }, [state, key])

  return [state, setState]
}
