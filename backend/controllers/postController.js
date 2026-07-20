const Post = require("../models/Post");
const User = require("../models/User");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name avatar role")
      .populate("comments.user", "name avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createPost = async (req, res) => {
  try {
    const { content, image, tags, type } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ message: "Please add some text to the post" });
    }

    const post = await Post.create({
      content,
      image,
      tags,
      type,
      author: req.user._id,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name avatar role",
    );
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLikedIndex = post.likes.indexOf(req.user._id);

    if (alreadyLikedIndex !== -1) {
      post.likes.splice(alreadyLikedIndex, 1);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: req.user._id,
      text: text,
    };

    post.comments.push(newComment);
    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate("author", "name avatar role")
      .populate("comments.user", "name avatar");

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const seedPosts = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res
        .status(400)
        .json({ message: "Please register a user first before seeding posts" });
    }

    const postCount = await Post.countDocuments();
    if (postCount > 0) {
      return res
        .status(400)
        .json({ message: "Posts already exist. Skipping seed." });
    }

    const dummyPosts = [
      {
        author: user._id,
        content:
          "Just built this amazing Campus Social Network platform using the MERN stack! The frontend is running React and Tailwind, and the backend is Express and MongoDB. So excited to share it with everyone!",
        type: "text",
        tags: ["MERN", "WebDev", "CampusConnect"],
      },
      {
        author: user._id,
        content:
          "Hey everyone! We have a guest lecture from Google's engineering team happening this Friday at 4 PM in the main auditorium. Don't miss it!",
        type: "announcement",
        tags: ["Event", "Google", "TechTalk"],
      },
      {
        author: user._id,
        content:
          "We are looking for a Junior Frontend Developer to join our startup. Must know React and have an eye for design. Message me for details!",
        type: "job",
        tags: ["Hiring", "Frontend", "React"],
      },
    ];

    await Post.insertMany(dummyPosts);
    res.status(201).json({ message: "Dummy posts added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPosts,
  createPost,
  toggleLikePost,
  addComment,
  seedPosts,
};
