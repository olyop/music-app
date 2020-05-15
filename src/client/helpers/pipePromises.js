const pipePromises = (...funcs) => x =>
  funcs.reduce(
    (acc,val) => acc.then(val),
    Promise.resolve(x),
  )

export default pipePromises
