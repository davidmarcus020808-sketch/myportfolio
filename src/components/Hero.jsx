import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";

import profile from "../assets/profile.jpg";
import bgImage from "../assets/jumbotrum.jpg";

const Hero = () => {
  /* ---------------- Typing Effect ---------------- */
  const roles = ["React Developer", "Django Developer", "Fullstack Engineer"];
  const [displayedText, setDisplayedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedText(roles[roleIndex].slice(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);

      if (charIndex + 1 === roles[roleIndex].length) {
        setTimeout(() => {
          setCharIndex(0);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 1200);
      }
    }, 120);

    return () => clearTimeout(timeout);
  }, [charIndex, roleIndex]);

  /* ---------------- Parallax ---------------- */
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] md:h-[75vh] flex items-center overflow-hidden px-6 md:px-16"
    >
      {/* ================= BACKGROUND ================= */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          y: bgY,
          scale: bgScale,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ================= CONTENT ================= */}
      <div className="relative max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="grid md:grid-cols-[1fr_auto] gap-10 items-center 
                     bg-white/10 backdrop-blur-xl border border-white/15 
                     rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* TEXT */}
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest text-sky-300">
              Portfolio
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
              David Marcus
            </h1>

            <p className="text-lg md:text-xl text-slate-200 font-mono">
              {displayedText}
              <span className="text-sky-400 animate-pulse">|</span>
            </p>

            <p className="text-slate-300 max-w-md">
              I build scalable, user-focused web applications with modern
              frontend and backend technologies.
            </p>

            <div className="flex gap-3 pt-4">
              <motion.a
                href="/projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-xl bg-sky-500 text-white font-medium 
                           hover:bg-sky-400 transition"
              >
                View Work
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-xl text-white 
                           border border-white/30 hover:bg-white/10 transition"
              >
                Contact
              </motion.a>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative w-36 h-36 md:w-40 md:h-40 rounded-full"
            >
              <div className="absolute inset-0 rounded-full bg-sky-400 blur-2xl opacity-30" />
              <img
                src={profile}
                alt="David Marcus"
                className="relative w-full h-full object-cover rounded-full 
                           border-2 border-white/70"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
