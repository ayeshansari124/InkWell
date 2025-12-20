const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.createPost = async (req, res) => {
  const { originalname, path } = req.file;
  const ext = originalname.split(".").pop();
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, async (err, info) => {
    if (err) throw err;

    const { title, summary, content } = req.body;

    await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.userId,
    });

    res.json("ok");
  });
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["name"])
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", [
    "name",
    "email",
  ]);
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() !== req.userId)
    return res.status(403).json({ error: "Not allowed" });

  let cover = post.cover;

  if (req.file) {
    const ext = req.file.originalname.split(".").pop();
    cover = req.file.path + "." + ext;
    fs.renameSync(req.file.path, cover);
  }

  post.title = req.body.title;
  post.summary = req.body.summary;
  post.content = req.body.content;
  post.cover = cover;

  await post.save();
  res.json({ message: "Post updated" });
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() !== req.userId)
    return res.status(403).json({ error: "Not allowed" });

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};
