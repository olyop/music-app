import { last, concat, initial, isEmpty } from "lodash"

const determineUserPrevUpdate = ({ prev, current, next, queue }) => {
  if (isEmpty(prev)) {
    return {
      prev,
      current,
      next,
      queue,
    }
  } else if (isEmpty(next)) {
    return {
      prev: initial(prev),
      current: last(prev),
      next,
      queue: concat(current, queue),
    }
  } else {
    return {
      prev: initial(prev),
      current: last(prev),
      next: concat(current, next),
      queue,
    }
  }
}

export default determineUserPrevUpdate
