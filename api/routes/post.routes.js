const express = require("express");
const multer = require("multer");
const requireAuth = require("../middleware/requireAuth");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/post", upload.single("file"), createPost);
router.get("/post", getPosts);
router.get("/post/:id", getPost);
router.put("/post/:id", requireAuth, upload.single("file"), updatePost);
router.delete("/post/:id", requireAuth, deletePost);

module.exports = router;
