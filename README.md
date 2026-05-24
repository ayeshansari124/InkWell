# ✍️ Inkwell - Modern Blogging Platform

A full-stack blogging platform built using **React, Node.js, Express, MongoDB, and Tailwind CSS**.

Inkwell allows users to publish stories, explore articles, follow authors, manage profiles, and engage with long-form content through a modern and responsive writing experience.

## 🌐 Live Demo

https://ink-well-xi.vercel.app/

---

## ✨ Features

- Secure authentication and authorization
- Public article reading without login
- User registration and login system
- Create, edit, and delete your own posts
- Rich text editor support using React Quill
- Upload cover images for articles
- Personalized author profiles
- Follow and unfollow authors
- Public profile viewing
- Author search functionality
- Responsive homepage with featured hero section
- Joined date and profile statistics
- Article summaries and formatted publishing dates
- Protected author-only actions
- Modern responsive UI across devices
- Structured frontend and backend architecture

---

## 🚀 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- React Quill
- Lucide React
- Date-fns
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Cookie Parser
- CORS

---

## 📂 Project Structure

### Backend Architecture

```bash
api/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
```

### Frontend Architecture

```bash
client/
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   └── styles/
```

This separation helped maintain scalability, modularity, and cleaner code organization similar to production-level applications.

---

## 📸 Screenshots

### 🏠 Homepage & Hero Section
Modern landing page displaying featured articles, platform branding, and public content browsing.

![Homepage](./screenshots/homepage.png)

---

### 🔐 Authentication System
Secure login system for accessing writing and profile management features.

![Login Page](./screenshots/login-page.png)

---

### 📝 Create New Article
Create and publish articles with titles, summaries, cover images, and formatted content.

![Create Post](./screenshots/create-post.png)

---

### ✍️ Rich Text Article Editor
Full-featured article editor with formatting tools for writing professional blog posts.

![Editor](./screenshots/editor.png)

---

### 📖 Single Article View
Dedicated reading page for individual blog posts with clean typography and immersive reading experience.

![Single Post](./screenshots/single-post.png)

---

### 👤 Personal Author Profile
Profile dashboard displaying user information, joined date, followers, and published articles.

![Own Profile](./screenshots/own-profile.png)

---

### ⚙️ Edit Profile
Update public profile information, profile picture, and author bio.

![Edit Profile](./screenshots/edit-profile.png)

---

### ✏️ Edit Existing Articles
Authors can modify and improve previously published articles.

![Edit Post](./screenshots/edit-post.png)

---

### 📰 Public Article Feed
Explore articles written by different authors across the platform.

![Articles Feed](./screenshots/articles-feed.png)

---

### 🌍 Public Author Profiles
Visit other authors’ profiles, explore their articles, and follow them.

![Public Profile](./screenshots/public-profile.png)

---

### 🔍 Author Search Functionality
Search and discover authors directly from the navigation search system.

![Search Authors](./screenshots/search-authors.png)

---

## 🧠 What I Learned

- Building complete MERN-style applications with separated frontend and backend architecture
- Authentication and protected routes using JWT
- Secure password hashing with bcrypt
- Handling cookies and user sessions
- Building reusable React components
- Context API state management
- Creating RESTful APIs with Express
- MongoDB schema design with Mongoose
- File uploads using Multer
- Rich text editor integration using React Quill
- Creating scalable folder structures
- Route protection and permission handling
- Building responsive layouts using Tailwind CSS
- Managing author-specific content workflows
- Search and follow system implementation

This project significantly improved my understanding of scalable frontend-backend integration, application architecture, user permissions, and real-world content management systems.

---

## 💡 Future Improvements

- Real-time notifications
- Comment system
- Article likes and bookmarks
- Draft saving functionality
- Dark/light theme toggle
- Reading time estimation
- Email verification
- Trending articles section
- Rich text image embedding
- Infinite scrolling feed
- Admin moderation dashboard

---

## 👩‍💻 Author

**Ayesha Ansari**

Built with ❤️ using React, Node.js, MongoDB, and Express