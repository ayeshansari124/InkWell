import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import SearchPage from "./pages/SearchPage";
import AuthorPage from "./pages/AuthorPage";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<IndexPage />} />
    <Route path="post/:id" element={<PostPage />} />
    <Route path="create" element={<CreatePostPage />} />
    <Route path="edit/:id" element={<EditPostPage />} />

    <Route path="search" element={<SearchPage />} />
    <Route path="author/:id" element={<AuthorPage />} />
  </Route>
</Routes>

  );
}

export default App;
