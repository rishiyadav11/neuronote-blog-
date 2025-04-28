import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageError(null);

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setImageError("Only JPEG, PNG, and GIF files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setImageError("File size should be less than 5MB.");
      return;
    }

    const toastId = toast.loading("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setMedia(res.data.secure_url);
      toast.success("Image uploaded successfully!", { id: toastId });
    } catch (error) {
      toast.error("Image upload failed. Try again.", { id: toastId });
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    const postData = { title, content, media };

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/v1/book/add`, postData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("token")}`,
        },
      });
      toast.success("Post created successfully!");
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-semibold placeholder-gray-400 focus:outline-none border-b border-gray-300 p-2"
          required
        />

        {media && (
          <div className="w-full">
            <img
              src={media}
              alt="Uploaded"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
          </div>
        )}

        <textarea
          placeholder="Tell your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] text-lg placeholder-gray-500 focus:outline-none border-b border-gray-300 p-2 resize-none"
          required
        ></textarea>

        <div className="flex items-center justify-between">
          <label className="cursor-pointer text-blue-600 hover:underline">
            Upload an image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className={`px-6 py-2 rounded-full text-white font-medium ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>

        {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
      </form>
    </div>
  );
};

export default CreateBlogPage;
