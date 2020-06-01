import { createContext } from "../helpers"

type SidebarContext = {
	sidebar: boolean,
	toggleSidebar: () => void,
}

const [ useSidebarContext, SidebarProvider ] =
	createContext<SidebarContext>()

export { useSidebarContext, SidebarProvider, SidebarContext }