import fs from "fs"

const replaceBetween = (str, start, end, value) => {
  return str.substring(0, start) + value + str.substring(end)
}

const importSql = path => {
  let sql = fs.readFileSync(path).toString()
  return args => {
    let index = 0
    let insideInsert = false
    let startIndex = 0
    let temp = ""
    let insideCurly = false
    let insideParam = false
    for (const char of sql) {
      if (insideParam) {
        if (char === " ") {
          insideParam = false
        } else {
          temp += char
        }
      } else if (insideCurly) {
        if (char === " ") {
          insideParam = true
        } else if (char === "}") {
          insideCurly = false
        }
      } else if (char === "{") {
        if (insideInsert) {
          insideCurly = true
        } else {
          startIndex = index
          insideInsert = true
        }
      } else if (char === "}") {
        const value = args[temp]
        const endIndex = index + 1
        const difference = (temp.length - value.length)
        sql = replaceBetween(sql, startIndex, endIndex, value)
        index = endIndex - 11 + difference
        temp = ""
        startIndex = 0
        insideInsert = false
      }
      index++
    }
    console.log(sql)
  }
}

export default importSql
