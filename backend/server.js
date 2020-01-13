const express = require("express")
const cors = require("cors")
const server = express()
const port = 3000

const mongoose = require("mongoose")
const db = mongoose.connect(
    "DB CREDENTIALS",
    { useNewUrlParser: true }
)

const appsRouter = require("./routes/apps")
const userRouter = require("./routes/user")

const bodyParser = require("body-parser")
server.use(bodyParser.json()) // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

var originsWhitelist = ["http://localhost:4200"]

var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1
        callback(null, isWhitelisted)
    },
    credentials: true
}

server.use(cors(corsOptions))

server.use("/api", appsRouter)
server.use("/auth", userRouter)

server.listen(port, () => console.log(`Server is listening on port ${port}!`))
