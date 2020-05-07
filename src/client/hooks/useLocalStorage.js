import { useState } from "react"

const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [ storedValue, setStoredValue ] = useState(() => {
    try {
      // Get from local storage by key
      const item = localStorage.getItem(key)
      // Parse if none return initialValue
      return item === null ? initialValue : item
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      localStorage.setItem(key, valueToStore)
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  return [ storedValue, setValue ]
}

export default useLocalStorage
