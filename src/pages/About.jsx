import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // <-- For Back Button
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SoftwareCertificate from "../assets/softwarecertificate.jpg";

/* TECH STACK */
const techStack = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "Django",
  "Python",
  "REST APIs",
  "Git",
  "PostgreSQL",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  const navigate = useNavigate(); // <-- Initialize navigate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [showBackBtn, setShowBackBtn] = useState(false); // <-- State for back button

  /* ESC key to close modal */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setIsModalOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  /* Show back button after scrolling 50px */
  useEffect(() => {
    const handleScroll = () => setShowBackBtn(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const onTouchMove = (e) => {
    if (!touchStartX) return;
    if (Math.abs(e.touches[0].clientX - touchStartX) > 70) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* BACK BUTTON */}
      <AnimatePresence>
        {showBackBtn && (
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="fixed top-6 left-6 z-50 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg text-slate-700 font-semibold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>
        )}
      </AnimatePresence>

      <main className="bg-slate-50 overflow-hidden">
        {/* HERO */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 to-slate-50" />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative max-w-6xl mx-auto px-6 text-center"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4"
            >
              About Me
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto"
            >
              I’m{" "}
              <span className="font-semibold text-slate-800">
                David Marcus
              </span>
              , a software developer who builds fast, scalable, and
              user-focused web applications with clean architecture and
              polished user experiences.
            </motion.p>

            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <motion.a
                variants={fadeUp}
                href="https://github.com/davidmarcus020808-sketch"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="px-7 py-3 rounded-xl bg-slate-900 text-white shadow-lg hover:shadow-xl transition"
              >
                View GitHub
              </motion.a>

              <motion.a
                variants={fadeUp}
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="px-7 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 shadow hover:shadow-md transition"
              >
                View Projects
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* TECH STACK */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8 text-center"
          >
            Technology Stack
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((tech) => (
              <motion.span
                key={tech}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 220 }}
                className="px-4 py-2 bg-white/90 backdrop-blur border border-slate-200 rounded-lg text-slate-700 shadow-sm text-sm"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </section>

        {/* CERTIFICATION */}
        <section className="max-w-6xl mx-auto px-6 py-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3"
          >
            Certification
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-600 mb-6 max-w-xl mx-auto"
          >
            Professional software development certification focused on
            full-stack development, backend integration, and modern
            frontend workflows.
          </motion.p>

          <motion.img
            src={SoftwareCertificate}
            alt="Software Certificate"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="w-full max-w-xs sm:max-w-sm mx-auto rounded-xl shadow-xl border cursor-zoom-in"
            onClick={() => setIsModalOpen(true)}
          />

          <p className="text-sm text-slate-500 mt-3">
            Tap or click to expand
          </p>
        </section>

        {/* MODAL */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
              onTouchMove={(e) => {
                if (!touchStartX) return;
                if (Math.abs(e.touches[0].clientX - touchStartX) > 70) {
                  setIsModalOpen(false);
                }
              }}
            >
              <motion.img
                src={SoftwareCertificate}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="max-h-[90vh] max-w-[95vw] rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* VALUE */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-slate-900 mb-10 text-center"
          >
            What I Bring
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
          >
            <ValueCard
              title="Frontend Engineering"
              description="Building responsive React interfaces with clean state management, accessibility, and performance in mind."
            />
            <ValueCard
              title="Backend Integration"
              description="Designing and consuming REST APIs with Django, handling authentication, data modeling, and scalability."
            />
            <ValueCard
              title="UI & Motion Design"
              description="Crafting smooth, purposeful animations using Framer Motion to improve usability and engagement."
            />
          </motion.div>
        </section>

        {/* SUMMARY */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-slate-900 mb-4"
          >
            Professional Summary
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-700 leading-relaxed"
          >
            I build production-ready web applications with a strong focus
            on clean architecture, performance, and user experience. I
            enjoy turning complex ideas into intuitive digital products
            that scale across devices.
          </motion.p>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ValueCard({ title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220 }}
      className="bg-white/90 backdrop-blur p-6 rounded-xl border border-slate-200 shadow-md hover:shadow-xl"
    >
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </motion.div>
  );
}
