const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Cover image required",
      });
    }

    const token = req.cookies.token;

    jwt.verify(token, process.env.JWT_SECRET, async (err, info) => {
      if (err) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const result = await uploadToCloudinary(req.file, "inkwell_posts");

      const { title, summary, content } = req.body;

      await Post.create({
        title,
        summary,
        content,
        cover: result.secure_url,
        author: info.userId,
      });

      res.json("ok");
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create post",
    });
  }
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["name", "avatar"])
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", [
    "name",
    "email",
    "avatar",
  ]);

  res.json(post);
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({
        error: "Not allowed",
      });
    }

    let cover = post.cover;

    if (req.file) {
      const result = await uploadToCloudinary(req.file, "inkwell_posts");
      cover = result.secure_url;
    }

    post.title = req.body.title;
    post.summary = req.body.summary;
    post.content = req.body.content;
    post.cover = cover;

    await post.save();

    res.json({
      message: "Post updated",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update post",
    });
  }
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() !== req.userId) {
    return res.status(403).json({
      error: "Not allowed",
    });
  }

  await post.deleteOne();

  res.json({
    message: "Post deleted",
  });
};
