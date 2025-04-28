import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading } from "../store/blogSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

// Type for Redux state
interface BlogState {
  posts: Array<any>; // Adjust to match the actual structure of your posts
  loading: boolean;
}

export const useBlog = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: { blog: BlogState }) => state.blog); // Access Redux state

  // Fetch all posts
  const fetchPosts = async () => {
    // If posts are already in the Redux store, return them (avoid refetching)
    if (posts.length > 0) {
      return posts;
    }

    try {
      dispatch(setLoading(true)); // Set loading state to true
      const res = await axios.get(`${API_URL}/api/v1/book/bulk`);
      dispatch(setPosts(res.data)); // Store posts in Redux
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to fetch posts");
      console.error("Fetch Posts Error:", error); // Log for debugging
      return [];
    } finally {
      dispatch(setLoading(false)); // Set loading state to false
    }
  };

  // Fetch a single post by ID
  const fetchPostById = async (id: string) => {
    const getCookie = (name: string): string | null => {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    };
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${API_URL}/api/v1/book/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("token")}`,
          },}
      );
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to fetch post");
      console.error("Fetch Post Error:", error); // Log for debugging
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };


  // Update an existing post
  const updatePost = async (id: string, data: { title: string; content: string; media?: string | null }) => {
    try {
      dispatch(setLoading(true));

      const postData = {
        ...data,
        media: data.media || null, // Use media if provided
      };

      await axios.put(`${API_URL}/api/v1/book/${id}`, postData, { withCredentials: true });
      toast.success("Post updated!");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to update post");
      console.error("Update Post Error:", error); // Log for debugging
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Delete a single post
  const deletePost = async (id: string) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`${API_URL}/api/v1/book/${id}`, { withCredentials: true });
      toast.success("Post deleted!");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to delete post");
      console.error("Delete Post Error:", error); // Log for debugging
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Bulk delete posts
  const bulkDeletePosts = async (ids: string[]) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`${API_URL}/api/v1/book/bulk/delete`, {
        data: { ids },
        withCredentials: true,
      });
      toast.success(res.data.message || "Posts deleted!");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to delete posts");
      console.error("Bulk Delete Posts Error:", error); // Log for debugging
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    loading,
    posts,
    fetchPosts,
    fetchPostById,
    updatePost,
    deletePost,
    bulkDeletePosts,
  };
};
