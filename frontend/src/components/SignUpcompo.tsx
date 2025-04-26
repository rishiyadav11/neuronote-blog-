import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { FaEye ,FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";


const SignUpcompo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading } = useAuth();
  const navigate = useNavigate(); // <-- added

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });
      navigate("/blogs"); // <-- after signup success, navigate to blogs

      alert("Signup successful!");
    } catch (error) {
      alert("Signup failed!");
    }
  };
  return (
    <div className="h-full w-[90% ] md:w-1/2  bg-zinc-100 flex justify-center items-center">
      <div className="w-full md:w-1/2 h-auto rounded-lg flex flex-col justify-center items-center p-1 md:p-5">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Create an account</h1>
        <h2 className="text-sm mb-4 text-zinc-600">
          Already have an account{" "}
          <Link to="/login" className="text-gray-400 underline">
            Login
          </Link>
        </h2>
        <form className="flex flex-col w-full space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Rishi Yadav"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}

              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="abc@gmail.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="password..."
                required
              />
              <button
                type="button"
                className="absolute right-4 top-3 text-lg cursor-pointer text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye/> : <FaEyeSlash/>}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="bg-black text-white p-2 cursor-pointer rounded hover:bg-gray-800 transition"
            onClick={handleSubmit}
          >
          {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpcompo;
