const express = require("express");
const multer = require("multer");
const requireAuth = require("../middleware/requireAuth");
const {
  getProfile,
  updateProfile,
  searchUsers,
  getAuthor,
  getAuthorPosts,
  toggleFollow,
} = require("../controllers/user.controller");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/profile", requireAuth, getProfile);
router.put("/profile", requireAuth, upload.single("avatar"), updateProfile);
router.get("/search", searchUsers);
router.get("/author/:id", getAuthor);
router.get("/author/:id/posts", getAuthorPosts);
router.post("/author/:id/follow", requireAuth, toggleFollow);

module.exports = router;
