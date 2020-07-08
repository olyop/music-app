import { createContext } from "../helpers"

interface SidebarContext {
	sidebar: boolean,
	toggleSidebar: () => void,
}

const [ useSidebarContext, SidebarProvider ] =
	createContext<SidebarContext>()

export { useSidebarContext, SidebarProvider, SidebarContext }