// implement your posts router here
const express = require('express')
const Post = require("./posts-model")
const router = express.Router()

///POSTS ENDPOINTS
///POSTS ENDPOINTS
///POSTS ENDPOINTS

//get all posts
router.get("/", (req, res) => {
    Post.find(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        err: err.message,
        stack: err.stack
      })
    }) 
})

//get post by specific id
router.get("/:id", (req, res) => {

})

//create new post
router.post("/", (req, res) => {

})

//edit post by id
router.put("/:id", (req, res) => {

})

//delete post with specific id
router.delete("/:id", (req, res) => {

})

//get post with specific id and its comments
router.get("/:id/comments", (req, res) => {

})
module.exports = router