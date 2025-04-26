import {  useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Homepage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement  >(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(containerRef.current, { opacity: 1, duration: 0.5 })
      .from(headingRef.current, { y: -50, opacity: 1, duration: 0.8 })
      .from(subHeadingRef.current, { y: 30, opacity: 1, duration: 0.8 }, "-=0.5")
      .from(buttonRef.current, { scale: 0.8, opacity: 1, duration: 0.6 }, "-=0.5");
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-200"
    >
      <h1
        ref={headingRef}
        className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mb-4"
      >
        Welcome to Neuronote
      </h1>

      <p
        ref={subHeadingRef}
        className="text-gray-600 text-lg md:text-xl max-w-2xl mb-6"
      >
        Your creative space to jot down thoughts, share ideas, and organize dreams beautifully.
      </p>

      <Link to="/signin"
        ref={buttonRef}
        className="px-6 mt-5 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Start Writing
      </Link>
    </div>
  );
};

export default Homepage;
