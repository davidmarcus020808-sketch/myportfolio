import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // for back button
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* SERVICE IMAGES */
import PersonalImg from "../assets/personal.jpg";
import PortfolioImg from "../assets/portfolio.jpg";
import BusinessImg from "../assets/business.jpg";
import EcommerceImg from "../assets/ecommerce.jpg";
import WebAppImg from "../assets/webapplication.jpg";
import SocialmediaImg from "../assets/socialmedia.jpg";
import EntertainmentImg from "../assets/entertainment.jpg";
import BlogImg from "../assets/blog.jpg";
import LandingImg from "../assets/landing.jpg";

/* CLIENT LOGOS */
import TechCorpLogo from "../assets/techcorp.jpg";
import StartupXLogo from "../assets/startupx.jpg";
import DesignStudioLogo from "../assets/designstudio.jpg";
import EduPlatformLogo from "../assets/eduplatform.jpg";

/* SERVICE DATA */
const services = [
  {
    id: "personal",
    title: "Personal Websites",
    description: "Professional personal websites to showcase your profile, achievements, and skills.",
    fullDescription: `We design personal websites that give you a professional online presence. These websites are perfect for showcasing your biography, skills, achievements, and unique story. Using modern web technologies, we create sites that are responsive, fast, and secure, allowing visitors to learn about you instantly.`,
    image: PersonalImg,
  },
  {
    id: "portfolio",
    title: "Portfolio Websites",
    description: "Showcase your creative projects with stunning and responsive portfolio sites.",
    fullDescription: `Your work deserves to be seen in the best possible way. Our portfolio websites highlight your projects, achievements, and creativity. We build interactive galleries, project showcases, and case studies that make it easy for potential clients or employers to understand your skills. Every portfolio is designed with clean layouts and intuitive navigation to reflect your professionalism.`,
    image: PortfolioImg,
  },
  {
    id: "webapp",
    title: "Web Applications",
    description: "Custom web apps with advanced functionality, real-time data, and authentication.",
    fullDescription: `We develop web applications that solve real-world problems efficiently. Whether it’s a simple tool, a productivity system, or a complex platform, we ensure your application is scalable, secure, and highly functional. Our development process focuses on creating software that not only works but also delivers a smooth user experience.`,
    image: WebAppImg,
  },
  {
    id: "socialmedia",
    title: "Social Media Websites",
    description: "Engaging platforms to connect users and communities online.",
    fullDescription: `We build social media platforms that connect people and foster interaction. With features like user profiles, messaging, content feeds, notifications, and friend networks, we create engaging digital communities. Our focus is on scalability, security, and seamless user experiences to support active interaction and growth.`,
    image: SocialmediaImg,
  },
  {
    id: "landing",
    title: "Landing Pages",
    description: "High-converting landing pages for marketing campaigns and products.",
    fullDescription: `Landing websites are designed to convert visitors into customers or leads. Whether you are launching a product, promoting a service, or running a marketing campaign, we create pages that capture attention and encourage action. We use analytics, A/B testing, and responsive design to ensure every visit counts.`,
    image: LandingImg,
  },
  {
    id: "business",
    title: "Business Websites",
    description: "Modern websites for businesses, startups, and professional companies.",
    fullDescription: `We develop business websites that elevate your brand and drive growth. Our platforms showcase your services, team, and company values in a professional, accessible way. Each business website we create is scalable, secure, and easy to manage, allowing your company to adapt and expand without technological barriers.`,
    image: BusinessImg,
  },
  {
    id: "ecommerce",
    title: "E-commerce Websites",
    description: "Full-featured online stores with secure payments and product management.",
    fullDescription: `We design e-commerce platforms that make online shopping seamless. From product catalogs and shopping carts to secure payment gateways and inventory management, we handle all aspects of digital commerce. Our websites are optimized for mobile and desktop users alike, ensuring customers have a smooth experience no matter the device.`,
    image: EcommerceImg,
  },
  {
    id: "entertainment",
    title: "Entertainment Websites",
    description: "Dynamic sites for movies, shows, and gaming content.",
    fullDescription: `Entertainment websites are built to engage and captivate your audience. Whether for streaming, gaming, or interactive content, we develop platforms that deliver smooth performance and rich experiences. Multimedia content, user interaction, and community features are integrated to maximize engagement and retention.`,
    image: EntertainmentImg,
  },
  {
    id: "blog",
    title: "Blog Websites",
    description: "Modern and responsive blogging platforms for writers and creators.",
    fullDescription: `We craft blog websites that give content creators a voice. Our CMS-driven platforms make publishing, editing, and categorizing content easy. Blogs are optimized for SEO, readability, and user engagement, with features like social sharing, comments, and search functionality built-in.`,
    image: BlogImg,
  },
];

/* CLIENT RATINGS */
const clients = [
  { name: "TechCorp", logo: TechCorpLogo, rating: 5, testimonial: "Amazing web solutions that boosted our sales!" },
  { name: "StartupX", logo: StartupXLogo, rating: 4.8, testimonial: "Professional, fast, and reliable team." },
  { name: "DesignStudio", logo: DesignStudioLogo, rating: 4.9, testimonial: "Creative solutions delivered with excellence." },
  { name: "EduPlatform", logo: EduPlatformLogo, rating: 5, testimonial: "Exceptional platforms for our students!" },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function Services() {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [showBackBtn, setShowBackBtn] = useState(false);

  /* Show back button after scrolling */
  useEffect(() => {
    const handleScroll = () => {
      setShowBackBtn(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-x-hidden">
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

      {/* HERO */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="pt-32 pb-12 px-6 text-center max-w-4xl mx-auto relative z-10"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-50 to-white blur-[120px] opacity-40 rounded-3xl" />
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">
          Our Services
        </h1>
        <p className="text-slate-600 text-lg">
          We build websites and applications that deliver results. Experienced, reliable, and available 24/7.
        </p>
        <a
          href="#services-grid"
          className="mt-6 inline-block bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-sky-500 transition"
        >
          Explore Services
        </a>
      </motion.section>

      {/* SERVICES GRID */}
      <motion.section
        id="services-grid"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mb-16 relative z-10"
      >
        <h2 className="text-3xl font-bold mb-10 text-center">What We Offer</h2>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -6, scale: 1.03 }}
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
              className="relative bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all group border border-white/30 hover:shadow-2xl hover:border-white/50"
            >
              <img src={service.image} alt={service.title} className="h-48 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-700">{service.description}</p>
                <button
                  onClick={() => setActiveService(service)}
                  className="mt-4 bg-sky-500/90 text-white px-4 py-2 rounded-full text-sm hover:bg-sky-600/90 transition"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SERVICE MODAL */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white/95 max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={activeService.image} alt={activeService.title} className="h-64 w-full object-cover" />
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{activeService.title}</h3>
                <p className="text-slate-700 mb-6">{activeService.fullDescription}</p>
                <button
                  onClick={() => setActiveService(null)}
                  className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CLIENT RATINGS */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 relative z-10"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Trusted by Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {clients.map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6 flex flex-col items-center border border-white/20 hover:shadow-lg transition"
              >
                <img src={client.logo} alt={client.name} className="h-12 mb-2" />
                <h3 className="font-bold text-lg mb-2">{client.name}</h3>
                <div className="text-yellow-500 text-xl">
                  {"★".repeat(Math.floor(client.rating)) + "☆".repeat(5 - Math.floor(client.rating))}
                </div>
                <p className="text-slate-600 mt-2 text-sm italic">"{client.testimonial}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 px-6 text-center relative z-10"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="text-slate-600 mb-6">
          Whether it’s a website, web application, or e-commerce platform, we can bring your ideas to life.
        </p>
        <a
          href="/contact"
          className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-sky-500 transition"
        >
          Contact Us
        </a>
      </motion.section>

      <Footer />
    </div>
  );
}
