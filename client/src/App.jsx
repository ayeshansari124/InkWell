import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


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

      </Route>
    </Routes>
  );
}

export default App;
