import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // for mobile menu
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loggedOutLinks = [
    { name: "All blogs", link: "/blogs" },
    { name: "About", link: "/about" },
    { name: "Login", link: "/login" },
  ];

  const loggedInLinks = [
    { name: "All blogs", link: "/blogs" },
    { name: "Write", link: "/write" },
    { name: "About", link: "/about" },
  ];

  const dropdownLinks = [
    { name: "Logout", link: "/logout" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-20 flex items-center justify-between px-6 border-b bg-white relative">
      {/* Logo */}
      <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        <Link to="/">neuronotes</Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 relative">
        {(isAuthenticated ? loggedInLinks : loggedOutLinks).map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className="text-gray-700 hover:text-black font-medium"
          >
            {item.name}
          </Link>
        ))}

        {isAuthenticated && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative inline-flex items-center cursor-pointer justify-center w-10 h-10 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-black rounded-full"
            >
              <span className="font-medium text-gray-200">Nn</span>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-10 transform transition-all duration-300 origin-top ${
                isOpen
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              {dropdownLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-md transform transition-all duration-300 ${
          menuOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        } origin-top`}
      >
        <div className="flex flex-col p-4">
          {(isAuthenticated ? loggedInLinks : loggedOutLinks).map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-gray-700 hover:text-black font-medium"
            >
              {item.name}
            </Link>
          ))}

          {isAuthenticated && (
            <>
              <div className="border-t my-2"></div>
              {dropdownLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-gray-700 hover:text-black font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
