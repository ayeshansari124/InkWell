import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";

function App() {
  return (
    <Routes>
      {/* Layout Route */}
      <Route path="/" element={<Layout />}>
        
        {/* Home Page */}
        <Route index element={<IndexPage />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Register Page (optional) */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/create"
          element={<CreatePostPage />}
        />
        <Route
          path="/post/:id"
          element={<PostPage />}
        />
        <Route path="/edit/:id" element={<EditPostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
