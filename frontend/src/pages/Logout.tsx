import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();
  const [confirmLeave, setConfirmLeave] = useState(false);

  useEffect(() => {
    if (confirmLeave) {
      Cookies.remove("token");
      toast.success("You have successfully left neuronotes!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [confirmLeave, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 text-center">
      <h1 className="text-5xl font-extrabold text-white mb-4 animate-pulse">
        neuronotes
      </h1>
      <p className="text-xl text-white mb-8">
        Are you sure you want to <span className="underline">leave</span>{" "}
        neuronotes? <br /> We'll miss you! 🥺
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => setConfirmLeave(true)}
          className="bg-white text-pink-600 cursor-pointer font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Yes, I want to leave
        </button>
        <button
          onClick={() => navigate("/blogs")}
          className="bg-white text-green-600 cursor-pointer font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          No, take me back!
        </button>
      </div>
    </div>
  );
};

export default Logout;
