import { useState, useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import Blogcompo from "../components/Blogcompo";
import { Link } from "react-router-dom"; // ✅ import Link

const Blogs = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const { fetchPosts, loading } = useBlog();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    fetchData();
  }, [fetchPosts]);

  return (
    <div className="flex flex-col items-center pt-5 min-h-screen bg-gray-100">
      {loading ? (
        <>
          <Blogcompo loading={loading} />
          <Blogcompo loading={loading} />
          <Blogcompo loading={loading} />
          <Blogcompo loading={loading} />
        </>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Link 
            to={`/blog/${post.id}`} 
            key={post.id} 
            className="w-full max-w-2xl mb-6"
          >
            <Blogcompo post={post} loading={loading} />
          </Link>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Blogs;
