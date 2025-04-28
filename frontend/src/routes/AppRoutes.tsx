import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Homepage from "../pages/Homepage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Logout from "../pages/Logout";
import Blogs from "../pages/Blogs";
import CreateBlogPage from "../pages/CreateBlog";
import BlogPage from "../pages/BlogPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogPage/>} /> {/* Assuming this is the blog detail page */}
        <Route path="/write" element={<CreateBlogPage/>} /> {/* Assuming this is the write page */}
      </Routes>
    </>
  );
};

export default AppRoutes;
