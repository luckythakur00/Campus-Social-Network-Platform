const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public (or Private depending on requirements)
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("author", "name avatar role").sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name avatar role");
  
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.status(200).json(post);
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { content, image, tags, type } = req.body;

  if (!content) {
    res.status(400);
    throw new Error("Please add a text content to the post");
  }

  const post = await Post.create({
    content,
    image,
    tags,
    type,
    author: req.user.id,
  });

  const createdPost = await Post.findById(post._id).populate("author", "name avatar role");
  res.status(201).json(createdPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Make sure the logged in user matches the post author
  if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.deleteOne();
  res.status(200).json({ id: req.params.id });
});

// @desc    Like / Unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
const toggleLikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const alreadyLiked = post.likes.includes(req.user.id);

  if (alreadyLiked) {
    post.likes = post.likes.filter((userId) => userId.toString() !== req.user.id);
  } else {
    post.likes.push(req.user.id);
  }

  await post.save();
  res.status(200).json({ id: req.params.id, likes: post.likes });
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  toggleLikePost,
};
