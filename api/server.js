// implement your server here
const express = require("express")
// require your posts router and connect it here
const postRouter = require("./posts/posts-router")
const server = express()

server.use(express.json()) //parse json middleware
server.use("/api/posts", postRouter)


module.exports = server