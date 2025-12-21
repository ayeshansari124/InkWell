require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

connectDB();

app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: "https://ink-well-xi.vercel.app/",
  credentials: true,
}));



app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
