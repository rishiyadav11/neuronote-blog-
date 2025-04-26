import { useEffect, useRef } from "react";
import gsap from "gsap";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(containerRef.current, {
      opacity: 1,
      duration: 1,
    })
    .from(headingRef.current, {
      y: -80,
      opacity: 1,
      duration: 1,
    }, "-=0.5") // start half a second earlier
    .from(paraRef.current, {
      y: 50,
      opacity: 1,
      duration: 1,
    }, "-=0.7"); // overlap more for smoother effect
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-200"
    >
      <h1
        ref={headingRef}
        className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6 text-center"
      >
        About Neuronote
      </h1>
      <p
        ref={paraRef}
        className="max-w-2xl text-center text-gray-600 text-lg md:text-xl"
      >
        Neuronote is a platform designed to help you express your thoughts, ideas, and creativity without limits.
        Built for dreamers, thinkers, and creators — Neuronote lets you write freely, beautifully, and stay organized.
      </p>
    </div>
  );
};

export default About;
