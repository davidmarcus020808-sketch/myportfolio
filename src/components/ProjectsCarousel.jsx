import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import local images
import DaveBankImg from "../assets/davebank.jpg";
import PortfolioImg from "../assets/portfolio.jpg";
import EcommerceImg from "../assets/ecommerce.jpg";
import BlogImg from "../assets/blog.jpg";
import ChatAppImg from "../assets/chatapp.jpg";
import TodoImg from "../assets/todo.jpg";

const projects = [
  {
    title: "DaveBank",
    description: "A modern banking app built with React & Django.",
    image: DaveBankImg,
    link: "https://davebank.vercel.app/",
    github: "https://github.com/davidmarcus020808-sketch",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio built with React, Tailwind & Framer Motion.",
    image: PortfolioImg,
    link: "#",
    github: "https://github.com/davidmarcus020808-sketch",
  },
  {
    title: "E-commerce App",
    description: "Full-stack e-commerce platform with React & Django REST.",
    image: EcommerceImg,
    link: "#",
    github: "#",
  },
  {
    title: "Blog App",
    description: "React blog with markdown support.",
    image: BlogImg,
    link: "#",
    github: "#",
  },
  {
    title: "Chat App",
    description: "Real-time chat app using React & Socket.io.",
    image: ChatAppImg,
    link: "#",
    github: "#",
  },
  {
    title: "Todo App",
    description: "Simple React Todo app.",
    image: TodoImg,
    link: "#",
    github: "#",
  },
];

const ProjectsCarousel = () => {
  const navigate = useNavigate();

  // Duplicate projects for smooth infinite scroll
  const scrollingProjects = [...projects, ...projects];

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
          Featured Projects
        </h2>

        {/* Autoplay carousel */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 min-w-max"
            animate={{ x: ["0%", "-50%"] }} // scroll left
            transition={{ repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" }}
          >
            {scrollingProjects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="
                  flex-shrink-0 
                  w-[220px] sm:w-[260px] md:w-[280px] lg:w-[300px] xl:w-[320px]
                  bg-white rounded-xl shadow-md overflow-hidden 
                  transition-shadow duration-300 hover:shadow-xl
                "
              >
                <div className="relative w-full h-48">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{project.description}</p>

                  <div className="mt-3 flex gap-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-400 transition text-sm"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-1 border border-slate-300 rounded hover:bg-slate-100 transition text-sm"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* See More Projects */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition"
          >
            See More Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
