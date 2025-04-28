import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface BlogProps {
  title?: string;
  content?: string;
  media?: string;
  createdAt?: string;
  authorId?: string;
}

const BlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogProps | null>(null);
  const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
     
      if (id) {
        try {
          const response = await axios.get(
            `${API_URL}/api/v1/book/${id}`
          );
          setPost(response.data); // Set the post directly with the API response
        } catch (error) {
          console.error("Error fetching the post:", error);
        }
      }
    };
    fetchData();
  }, [id]);

  console.log(post);
  

  if (!post) {
    return <div className="text-center pt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Title and Author Info */}
        <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
          <div className="font-semibold">Author: {post.authorId}</div> {/* Author name can be fetched separately if needed */}
          {post.createdAt && (
            <>
              <span>•</span>
              <div>{new Date(post.createdAt).toLocaleDateString()}</div>
            </>
          )}
        </div>

        {/* Post Image */}
        {post.media && (
          <div className="mb-8">
            <img
              src={post.media}
              alt="Cover"
              className="w-full h-80 object-cover rounded-md"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.content?.split("\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
