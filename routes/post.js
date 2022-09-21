const router = require('express').Router();
const { createPost, getposts, getPostbyCollege, getPostByuser, deletePost } = require('../controllers/post');

router.post("/createPost", createPost);
router.get("/getPosts", getposts);
router.post("/getPostsbyCollege", getPostbyCollege);
router.post("/getPostsbyUser", getPostByuser);
router.post("/deletePost", deletePost);

module.exports = router;