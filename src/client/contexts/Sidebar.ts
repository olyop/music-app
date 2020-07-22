import { Dispatch, SetStateAction } from "react"
import { createContext } from "../helpers"

interface SidebarContext {
	sidebar: boolean,
	setSidebar: Dispatch<SetStateAction<boolean>>,
}

const [ useSidebarContext, SidebarProvider ] =
	createContext<SidebarContext>()

export { useSidebarContext, SidebarProvider, SidebarContext }