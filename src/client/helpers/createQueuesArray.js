import { uniqueId } from "lodash"

const createQueuesArray = ({ prev, current, next, queue }) => [
  {
    id: uniqueId(),
    key: "prev",
    name: "Previous",
    songs: prev,
  },
  {
    id: uniqueId(),
    key: "current",
    name: "Playing",
    songs: [current],
  },
  {
    id: uniqueId(),
    key: "next",
    name: "Next",
    songs: next,
  },
  {
    id: uniqueId(),
    key: "queue",
    name: "Later",
    songs: queue,
  },
]

export default createQueuesArray
