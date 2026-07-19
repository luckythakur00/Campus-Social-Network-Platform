const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  toggleLikePost,
  addComment,
  seedPosts,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

// Seed dummy posts (Public)
router.post("/seed", seedPosts);

// Get all posts (Public) or Create a new post (Private)
router.route("/").get(getPosts).post(protect, createPost);

// Like or Unlike a post (Private)
router.put("/:id/like", protect, toggleLikePost);

// Add a comment to a post (Private)
router.post("/:id/comment", protect, addComment);

module.exports = router;
