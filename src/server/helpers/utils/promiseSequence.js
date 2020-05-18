const promiseSequence = async funcs => {
  for(const func of funcs) {
    await readFile(file);
  }
}

export default promiseSequence
