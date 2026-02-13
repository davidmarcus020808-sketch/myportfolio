import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallax = (speed) => ({
    x: (mousePos.x - window.innerWidth / 2) * speed,
    y: (mousePos.y - window.innerHeight / 2) * speed,
  });

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col md:flex-row items-center justify-center px-6 md:justify-around">

      {/* Background floating shapes */}
      <motion.div
        className="absolute w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"
        style={parallax(0.02)}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none bottom-0 right-10"
        style={parallax(-0.015)}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-2xl pointer-events-none top-10 left-1/4"
        style={parallax(0.01)}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg md:max-w-md"
      >
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-slate-300 mb-8">
          The page you’re looking for doesn’t exist or has been moved. Don’t worry, the robot will guide you back!
        </p>
      </motion.div>

      {/* Robot + Circuit */}
      <motion.div
        className="relative w-48 md:w-64 mb-6 md:mb-0"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-full h-full">
          {/* Circuit trail */}
          <path
            d="M10 52 C20 40, 40 40, 54 28"
            stroke="#38bdf8"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 6"
          >
            <animateTransform attributeName="transform" type="translate" values="0,0;0,2;0,0" dur="3s" repeatCount="indefinite"/>
          </path>

          {/* Robot body */}
          <rect x="18" y="20" width="28" height="28" rx="6" fill="#38bdf8" />
          {/* Robot eyes */}
          <circle cx="26" cy="30" r="3" fill="#fff">
            <animate attributeName="cy" values="30;28;30" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="38" cy="30" r="3" fill="#fff">
            <animate attributeName="cy" values="30;32;30" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Robot antenna */}
          <line x1="32" y1="12" x2="32" y2="20" stroke="#a78bfa" strokeWidth="2">
            <animate attributeName="y2" values="20;18;20" dur="1.2s" repeatCount="indefinite"/>
          </line>
          <circle cx="32" cy="12" r="2" fill="#a78bfa">
            <animate attributeName="cy" values="12;10;12" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          {/* Robot arms */}
          <line x1="18" y1="28" x2="10" y2="36" stroke="#38bdf8" strokeWidth="3">
            <animateTransform attributeName="transform" type="rotate" values="0 18 28;10 36 10;0 18 28" dur="1.8s" repeatCount="indefinite"/>
          </line>
          <line x1="46" y1="28" x2="54" y2="36" stroke="#38bdf8" strokeWidth="3">
            <animateTransform attributeName="transform" type="rotate" values="0 46 28;54 36 10;0 46 28" dur="1.8s" repeatCount="indefinite"/>
          </line>
        </svg>

        {/* Go Home button for larger screens with glow */}
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block mt-6 w-full bg-gradient-to-r from-sky-400 to-purple-500 text-slate-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all duration-300"
        >
          Go Home
        </motion.button>
      </motion.div>

      {/* Go Home button for smaller screens with glow */}
      <motion.div className="block md:hidden mt-6">
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-sky-400 to-purple-500 text-slate-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all duration-300"
        >
          Go Home
        </motion.button>
      </motion.div>

    </div>
  );
};

export default NotFound;
