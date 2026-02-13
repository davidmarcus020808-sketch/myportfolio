import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const social = [
    { icon: <FaGithub />, link: "https://github.com/davidmarcus020808-sketch" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/david-effiong-0a164a3a0" },
    { icon: <FaEnvelope />, link: "mailto:davidmarcus020808@gmail.com" },
    { icon: <FaWhatsapp />, link: "https://wa.me/2347081091762" },
    { icon: <FaTelegram />, link: "https://t.me/davidmarcus028" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/davidmarcuseffiong?igsh=MXgwdDhveHUzeHgycw%3D%3D&utm_source=qr" },
    { icon: <FaFacebook />, link: "https://web.facebook.com/profile.php?id=100091917469282" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  // Floating particles
  const particles = Array.from({ length: 15 });

  return (
    <footer className="relative bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 text-slate-200 overflow-hidden pt-12 pb-8">
      
      {/* Animated particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-sky-500 rounded-full"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.5,
          }}
          animate={{
            top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 4,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-10">

        {/* Branding / Newsletter */}
        <div className="flex flex-col items-start md:items-start space-y-3">
          <h2 className="text-3xl font-bold text-white mb-1">
            David<span className="text-sky-400">.</span>
          </h2>
          <p className="text-sm text-slate-400">
            Building modern, scalable web applications. Let’s create something awesome together.
          </p>

          {/* Newsletter */}
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-xs gap-2 mt-2"
          >
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-l-md border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 flex-1"
              required
            />
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded-r-md font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold mb-2 text-white">Quick Links</h3>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-slate-400 hover:text-sky-400 transition ${
                  isActive ? "text-sky-400 font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Social / Contact */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold mb-2 text-white">Connect</h3>
          <div className="flex flex-wrap gap-4 mt-1">
            {social.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, color: "#38BDF8" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-slate-400 text-2xl transition"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>

          {/* Direct contact info */}
          <div className="mt-4 text-slate-400 text-sm space-y-1">
            <p>WhatsApp: <a href="https://wa.me/2347081091762" className="hover:text-sky-400">+234 708 109 1762</a></p>
            <p>Telegram: <a href="https://t.me/davidmarcus028" className="hover:text-sky-400">t.me/davidmarcus028</a></p>
            <p>Email: <a href="mailto:davidmarcus020808@gmail.com" className="hover:text-sky-400">davidmarcus020808@gmail.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/david-effiong-0a164a3a0" className="hover:text-sky-400">linkedin.com/in/david-effiong</a></p>
            <p>Instagram: <a href="https://www.instagram.com/davidmarcuseffiong?igsh=MXgwdDhveHUzeHgycw%3D%3D&utm_source=qr" className="hover:text-sky-400">instagram.com/davidmarcuseffiong</a></p>
            <p>Facebook: <a href="https://web.facebook.com/profile.php?id=100091917469282" className="hover:text-sky-400">facebook.com/davidmarcus</a></p>
          </div>
        </div>

      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.2 }}
        className="fixed bottom-6 right-6 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-400 transition z-50"
      >
        ↑
      </motion.button>

      {/* Bottom copyright */}
      <div className="mt-10 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} David Marcus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
