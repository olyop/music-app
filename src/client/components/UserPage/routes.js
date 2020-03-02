import Queue from "../Queue"

import { uniqueId } from "lodash"

const routes = [
  {
    ignore: true,
    id: uniqueId(),
    name: "Queue",
    path: "/queue",
    component: Queue,
  },
]

export default routes
