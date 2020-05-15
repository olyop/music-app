const promiseSequence = promises => promises.reduce(
  (promiseChain, currentTask) => promiseChain.then(
    chainResults => currentTask.then(
      currentResult => [ ...chainResults, currentResult ],
    ),
  ),
  Promise.resolve([]),
)

export default promiseSequence
