const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const requireAuth = require('./middleware/requireAuth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs= require('fs');
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("Mongo error:", err.message);
    process.exit(1);
  });


app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
    });

  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if(isMatch) {
        //logged in
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
  httpOnly: true,
  sameSite: 'lax',
  secure: false, 
});
        res.json({ message: 'Login successful' });

    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
  } catch (err) {
    console.error('PROFILE ERROR:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/logout', (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'lax',
      secure: false,
    })
    .json({ message: 'Logged out' });
});

app.post('/post', upload.single('file'), async (req, res) => {
  const {originalname, path} = req.file;
  const parts= originalname.split('.');
  const ext= parts[parts.length -1];
  const newPath= path + '.' + ext;
  const fs= require('fs');
  fs.renameSync(path, newPath);

  const token= req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    req.userId= info.userId;
  const {title, summary, content} = req.body;
  const postDoc = await Post.create({
  title,
  summary,
  content,
  cover: newPath,
  author: req.userId, 
});
  })
res.json("ok");
}); 

app.get('/post', async (req, res) => {
  res.json( await Post.find().populate('author').sort({createdAt: -1}) );
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author',['name', 'email']);
  res.json(postDoc);
});

app.put('/post/:id', requireAuth, upload.single('file'), async (req, res) => {
  const post = await Post.findById(req.params.id);

  //not author
  if (post.author.toString() !== req.userId) {
    return res.status(403).json({ error: "Not allowed" });
  }

  let newCover = post.cover;

  if (req.file) {
    const { originalname, path } = req.file;
    const ext = originalname.split('.').pop();
    newCover = path + '.' + ext;
    fs.renameSync(path, newCover);
  }

  post.title = req.body.title;
  post.summary = req.body.summary;
  post.content = req.body.content;
  post.cover = newCover;

  await post.save();
  res.json({ message: "Post updated" });
});

app.delete('/post/:id', requireAuth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() !== req.userId) {
    return res.status(403).json({ error: "Not allowed" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
});

app.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json([]);
  }

  const users = await User.find({
    name: { $regex: q, $options: "i" }, // case-insensitive
  }).select("name _id");

  res.json(users);
});

app.get("/author/:id/posts", async (req, res) => {
  const posts = await Post.find({ author: req.params.id })
    .populate("author", ["name"])
    .sort({ createdAt: -1 });

  res.json(posts);
});

app.post("/author/:id/follow", requireAuth, async (req, res) => {
  const author = await User.findById(req.params.id);

  if (author.followers.includes(req.userId)) {
    author.followers.pull(req.userId);
  } else {
    author.followers.push(req.userId);
  }

  await author.save();
  res.json({ followers: author.followers.length });
});

app.get("/author/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("name avatar bio followers");

  const postCount = await Post.countDocuments({ author: user._id });

  res.json({ user, postCount });
});

app.put(
  "/profile",
  requireAuth,
  upload.single("avatar"),
  async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // BIO
    if (req.body.bio !== undefined) {
      user.bio = req.body.bio;
    }

    // AVATAR
    if (req.file) {
      const { originalname, path } = req.file;
      const ext = originalname.split(".").pop();
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      user.avatar = newPath;
    }

    await user.save();

    res.json({
      message: "Profile updated",
      user: {
        _id: user._id,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
      },
    });
  }
);

app.listen(4000, () => {
  console.log('API server running on http://localhost:4000');
});
