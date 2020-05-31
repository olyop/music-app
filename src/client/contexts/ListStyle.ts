import { createContext } from "react"
import { ListStyleType, ListStyleEnum } from "../types"

const ListStyleContext =
  createContext<ListStyleType>({ listStyle: ListStyleEnum.grid })

export default ListStyleContext