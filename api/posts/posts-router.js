// implement your posts router here
const express = require("express"); //common js

const router = express.Router();

const Post = require("./posts-model");
console.log("Model ->", Post);

// posts endpoints here
router.get("/", (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        error: err.message,
      });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
  .then((posts) => {
    if(!posts) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
    } else {
      res.json(posts)
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "The post information could not be retrieved",
      error: err.message
    })
  })
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params
  Post.findPostComments(id)
  .then(comments => {
    if(!comments) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
    } else {
      res.json(comments)
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "The comments information could not be retrieved",
      error: err.message
    })
  })
});

router.post("/", async (req, res) => {
  try{
    if(!res.body.title || !res.body.contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post"
      })
    } else {
      const newPost = await Post.insert(req.body)
      res.status(201).json(newPost)
    }
  } catch(err) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
      error: err.message
    })
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params
  const updates = req.body
  Post.update(id, updates)
    .then(post => {
      if(!updates.title || !updates.contents) {
        res.status(400).json({
          message: "Please provide title and contents for the post"
        })
      } else {
        if(!post) {
          res.status(404).json({
            message: "The post with the specified ID does not exist"
          })
        } else {
          res.status(200).json(post)
        }
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be modified",
        error: err.message
      })
    })
});

router.delete("/:id", async (req, res) => {
  try{
    const possiblePost = await Post.findById(req.params.id)
    if(!possiblePost) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
    } else {
      const deletedPost = await Post.remove(possiblePost.id)
      res.status(200).json(deletedPost)
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed",
      error: err.message
    })
  }
});

//expose the router
module.exports = router;
