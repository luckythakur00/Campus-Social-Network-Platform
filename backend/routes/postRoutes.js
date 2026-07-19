const express = require("express");
const router = express.Router();
const { getPosts, getPostById, createPost, deletePost, toggleLikePost } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

// Public (or Private) routes
router.route("/").get(getPosts).post(protect, createPost);
router.route("/:id").get(getPostById).delete(protect, deletePost);

// Like/Unlike
router.put("/:id/like", protect, toggleLikePost);

module.exports = router;
