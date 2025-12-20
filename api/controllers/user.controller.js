const User = require("../models/User");
const Post = require("../models/Post");
const fs = require("fs");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json({ user });
};

exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.userId);

  if (req.body.bio !== undefined) user.bio = req.body.bio;

  if (req.file) {
    const ext = req.file.originalname.split(".").pop();
    const newPath = req.file.path + "." + ext;
    fs.renameSync(req.file.path, newPath);
    user.avatar = newPath;
  }

  await user.save();
  res.json({ user });
};

exports.searchUsers = async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);

  const users = await User.find({
    name: { $regex: q, $options: "i" },
  }).select("name avatar bio followers");

  const results = await Promise.all(
    users.map(async (u) => ({
      _id: u._id,
      name: u.name,
      avatar: u.avatar,
      bio: u.bio,
      postCount: await Post.countDocuments({ author: u._id }),
      followerCount: u.followers.length,
    }))
  );

  res.json(results);
};

exports.getAuthor = async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "name avatar bio followers"
  );

  res.json({
    user,
    postCount: await Post.countDocuments({ author: user._id }),
    followerCount: user.followers.length,
  });
};

exports.getAuthorPosts = async (req, res) => {
  const posts = await Post.find({ author: req.params.id })
    .populate("author", ["name"])
    .sort({ createdAt: -1 });

  res.json(posts);
};

exports.toggleFollow = async (req, res) => {
  const author = await User.findById(req.params.id);

  const isFollowing = author.followers.includes(req.userId);

  isFollowing
    ? author.followers.pull(req.userId)
    : author.followers.push(req.userId);

  await author.save();

  res.json({
    followers: author.followers.length,
    following: !isFollowing,
  });
};
