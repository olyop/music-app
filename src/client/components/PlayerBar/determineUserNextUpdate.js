import { head, tail, concat, isEmpty } from "lodash"

const determineUserNextUpdate = ({ prev, current, next, queue }) => {
  if (isEmpty(next) && isEmpty(queue)) {
    return {
      prev,
      current,
      next,
      queue,
    }
  } else if (isEmpty(next)) {
    return {
      prev: concat(prev, current),
      current: head(queue),
      next,
      queue: tail(queue),
    }
  } else {
    return {
      prev: concat(prev, current),
      current: head(next),
      next: tail(next),
      queue,
    }
  }
}

export default determineUserNextUpdate
