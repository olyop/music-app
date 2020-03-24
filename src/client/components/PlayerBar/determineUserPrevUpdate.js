import { last, concat, initial, isEmpty } from "lodash"

const determineUserPrevUpdate = ({ prev, current, next, queue }) => {
  if (isEmpty(prev)) {
    return {}
  } else if (isEmpty(next)) {
    return {
      prev: initial(prev),
      current: last(prev),
      queue: concat(current, queue),
    }
  } else if (isEmpty(queue)) {
    return {
      prev: initial(prev),
      current: last(prev),
      queue: [current],
    }
  } else {
    return {
      prev: initial(prev),
      current: last(prev),
      next: concat(current, next),
    }
  }
}

export default determineUserPrevUpdate
