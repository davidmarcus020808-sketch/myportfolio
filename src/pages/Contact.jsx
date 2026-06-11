import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/spinner.jsx";
import { FiMapPin, FiMail, FiPhone, FiMessageCircle, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import axiosClient from "../axiosClient.js";
import emailjs from "@emailjs/browser"; // <-- EmailJS import

/* ---------------- Animations ---------------- */
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ---------------- Utils ---------------- */
const isValidEmail = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const formatPhone = (phone = "") => {
  const cleaned = phone.replace(/\D/g, "");
  if (!cleaned) return "";
  return cleaned.startsWith("234") ? cleaned : `234${cleaned.slice(1)}`;
};

export default function Contact() {
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", honeypot: "" });
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  /* ---------------- Form Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setEmailError(false);
  };

  /* ---------------- Helper: EmailJS send (separate function to avoid nested try/catch) ---------------- */
  const sendEmailJsIfNeeded = async (formData) => {
    const firstMessageKey = `firstMessageSent_${formData.email}`;
    const alreadySent = localStorage.getItem(firstMessageKey);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS env variables are missing in production.");
      return;
    }

    if (alreadySent) return;

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          to_email: formData.email,
          reply_message: `Hi ${formData.name},\n\nThanks for reaching out! We've received your message and will get back to you shortly.\n\nCheers,\nDavid Marcus`,
        },
        publicKey
      );
      localStorage.setItem(firstMessageKey, "true");
    } catch (emailErr) {
      console.error("EmailJS send error:", emailErr);
    }
  };

  /* ---------------- Submission (production-safe: no nested try/catch) ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setEmailError(true);
      return;
    }

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA to submit the form.");
      return;
    }

    setLoading(true);
    let spinnerTimeout = setTimeout(() => setShowSpinner(true), 500);

    try {
      await axiosClient.post("contact/", {
        ...form,
        recaptcha_token: recaptchaToken,
      });

      await sendEmailJsIfNeeded(form);

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "", honeypot: "" });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Contact form error:", err);
      const msg = err.response?.data?.error || "Failed to send message. Try again later.";
      alert(msg);
    } finally {
      if (spinnerTimeout) clearTimeout(spinnerTimeout);
      setLoading(false);
      setShowSpinner(false);
    }
  };

  return (
    <div className="relative bg-slate-950 min-h-screen text-white overflow-hidden">
      <Navbar />
      {showSpinner && <Spinner />}

      {/* ================= BACK BUTTON ================= */}
      {/* Sits just below the fixed navbar (top-16 = 64px = navbar height) */}
      <div className="fixed top-[72px] left-4 sm:left-6 z-40">
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors shadow-lg"
        >
          <FiArrowLeft size={15} />
          <span>Back</span>
        </motion.button>
      </div>

      {/* ================= HERO ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative pt-40 pb-16 px-4 sm:px-6 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Let's build something{" "}
          <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">meaningful</span>
        </h1>
        <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed px-2">
          Whether it's a product, redesign, or idea — I help turn concepts into intuitive, scalable digital experiences.
        </p>
        <div className="mt-8 h-[2px] w-16 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full" />
      </motion.section>

      {/* ================= FORM & INFO ================= */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-28 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
      >
        {/* -------- FORM -------- */}
        <motion.div variants={fadeUp}>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 bg-emerald-500/15 text-emerald-300 px-4 py-3 rounded-xl text-sm"
            >
              <FiCheckCircle /> Message sent — I'll reply shortly
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 grid gap-6 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="input-dark"
              />
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`input-dark ${emailError ? "ring-2 ring-red-400" : ""}`}
                />
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  autoComplete="off"
                />
                {emailError && <p className="mt-1 text-sm text-red-400">Please enter a valid email</p>}
              </div>
            </div>

            <input
              type="text"
              name="phone"
              placeholder="WhatsApp number (optional)"
              value={form.phone}
              onChange={handleChange}
              className="input-dark"
            />
            <input
              type="text"
              name="subject"
              placeholder="What's this about?"
              value={form.subject}
              onChange={handleChange}
              required
              className="input-dark"
            />
            <textarea
              name="message"
              placeholder="Tell me about your goals, timeline, or challenges…"
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
              className="input-dark resize-none"
            />

            {/* ---------------- RECAPTCHA ---------------- */}
            <div className="overflow-x-auto">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                ref={recaptchaRef}
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading || !recaptchaToken}
              whileHover={!loading ? { scale: 1.03 } : {}}
              whileTap={!loading ? { scale: 0.96 } : {}}
              className={`bg-gradient-to-r from-sky-400 to-blue-500 text-slate-900 py-3 rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition ${
                loading || !recaptchaToken ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading && <div className="w-5 h-5 border-2 border-t-2 border-slate-900 rounded-full animate-spin" />}
              {loading ? "Sending…" : "Send message"}
            </motion.button>

            {form.phone && (
              <a
                href={`https://wa.me/${formatPhone(form.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-emerald-500/90 text-white py-3 rounded-full font-semibold hover:bg-emerald-500 transition"
              >
                <FiMessageCircle /> Continue on WhatsApp
              </a>
            )}
          </form>
        </motion.div>

        {/* -------- CONTACT INFO WITH MAP -------- */}
        <motion.div variants={fadeUp} className="grid gap-6 content-start">
          {/* Location */}
          <motion.div
            whileHover={{ y: -4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
              <FiMapPin />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-slate-400">Location</p>
              <p className="font-semibold text-white">Uyo, Akwa Ibom, Nigeria</p>
              <div className="mt-3 w-full h-48 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  title="Uyo Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.560997592682!2d7.92550917503386!3d5.030421995811773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104b9f6e36f5b0b7%3A0x7b0f8e835b0c3741!2sUyo%2C%20Akwa%20Ibom%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1696187300000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            whileHover={{ y: -4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
              <FiMail />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-slate-400">Email</p>
              <a href="mailto:davidmarcus020808@gmail.com" className="font-semibold text-white hover:underline break-all">
                davidmarcus020808@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            whileHover={{ y: -4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
              <FiPhone />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-slate-400">Phone</p>
              <a href="tel:+2347081091762" className="font-semibold text-white hover:underline">
                +234 708 109 1762
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ================= WHATSAPP POPUP ================= */}
      <a
        href="https://api.whatsapp.com/send/?phone=2347081091762&text=Hi%2C%20I%20found%20your%20website%20and%20would%20like%20to%20discuss%20a%20project.&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 sm:right-6 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-full shadow-lg flex items-center gap-2 sm:gap-3 z-50 transition text-sm sm:text-base"
      >
        <FiMessageCircle size={20} />
        <span className="hidden sm:inline">Contact via WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>

      <Footer />
    </div>
  );
}