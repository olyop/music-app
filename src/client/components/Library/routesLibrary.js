import LibraryArtists from "./LibraryArtists"
import LibraryAlbums from "./LibraryAlbums"
import LibrarySongs from "./LibrarySongs"

const routesLibrary = [
  {
    key: "bdlOupmmra",
    path: "/albums",
    name: "Albums",
    component: LibraryAlbums
  },
  {
    key: "EJFnCCqTCi",
    path: "/artists",
    name: "Artists",
    component: LibraryArtists
  },
  {
    key: "QejATPbDAD",
    path: "/songs",
    name: "Songs",
    component: LibrarySongs
  }
]

export default routesLibrary
