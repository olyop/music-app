const path = require("path")
const fs = require("fs")

const { Album } = require("./db/models")

const cover = fs.readFileSync(path.resolve("src", "server", "test.jpg"))

Album.create(
  { title: "foo", year: 2019, artist: "foo", cover },
  (err, doc) => {
    console.log(doc)
  }
)
