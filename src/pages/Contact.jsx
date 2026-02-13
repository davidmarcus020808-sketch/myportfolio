import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { FiMapPin, FiMail, FiPhone, FiMessageCircle, FiCheckCircle } from "react-icons/fi";
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
  const [backVisible, setBackVisible] = useState(true);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  /* ---------------- Scroll-based Back Button ---------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      setBackVisible(current < lastScroll || current < 50);
      lastScroll = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Form Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setEmailError(false);
  };
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
    // ---------------- Axios POST (backend) ----------------
    await axiosClient.post("contact/", {
      ...form,
      recaptcha_token: recaptchaToken,
    });

    // ---------------- EmailJS auto-reply (first message only) ----------------
    const firstMessageKey = `firstMessageSent_${form.email}`;
    const alreadySent = localStorage.getItem(firstMessageKey);

    if (!alreadySent) {
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          await emailjs.send(
            serviceId,
            templateId,
            {
              name: form.name,
              to_email: form.email,
              reply_message: `Hi ${form.name},\n\nThanks for reaching out! We’ve received your message and will get back to you shortly.\n\nCheers,\nDavid Marcus`,
            },
            publicKey
          );
          localStorage.setItem(firstMessageKey, "true"); // mark as sent
        } else {
          console.warn("EmailJS env variables are missing in production.");
        }
      } catch (emailErr) {
        console.error("EmailJS send error:", emailErr);
      }
    }

    // ---------------- Reset form & reCAPTCHA ----------------
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
      <motion.div
        className="fixed top-2 left-6 z-50 px-4 py-2 rounded-xl backdrop-blur-md shadow-md text-slate-700 font-semibold cursor-pointer"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: backVisible ? 0 : -60, opacity: backVisible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md shadow-md text-white font-semibold hover:bg-white/30 transition"
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
        >
          ← Back
        </motion.button>
      </motion.div>

      {/* ================= HERO ================= */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" className="relative pt-36 pb-24 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Let’s build something{" "}
          <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">meaningful</span>
        </h1>
        <p className="mt-5 text-slate-300 text-lg leading-relaxed">
          Whether it’s a product, redesign, or idea — I help turn concepts into intuitive, scalable digital experiences.
        </p>
        <div className="mt-8 h-[2px] w-16 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full" />
      </motion.section>

      {/* ================= FORM & INFO ================= */}
      <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative max-w-6xl mx-auto px-6 pb-28 grid md:grid-cols-2 gap-16">
        {/* -------- FORM -------- */}
        <motion.div variants={fadeUp}>
          {success && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-2 bg-emerald-500/15 text-emerald-300 px-4 py-3 rounded-xl">
              <FiCheckCircle /> Message sent — I’ll reply shortly
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 grid gap-6 shadow-2xl">
            <div className="grid sm:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required className="input-dark" />
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

            <input type="text" name="phone" placeholder="WhatsApp number (optional)" value={form.phone} onChange={handleChange} className="input-dark" />
            <input type="text" name="subject" placeholder="What’s this about?" value={form.subject} onChange={handleChange} required className="input-dark" />
            <textarea name="message" placeholder="Tell me about your goals, timeline, or challenges…" rows={6} value={form.message} onChange={handleChange} required className="input-dark resize-none" />

            {/* ---------------- RECAPTCHA ---------------- */}
            <ReCAPTCHA
              sitekey="6Lc1i2IsAAAAAHMblgJewKAu_YyIUqNgRSLAfm7k"
              ref={recaptchaRef}
              onChange={(token) => {
                setRecaptchaToken(token);
              }}
            />

            <motion.button
              type="submit"
              disabled={loading || !recaptchaToken}
              whileHover={!loading ? { scale: 1.03 } : {}}
              whileTap={!loading ? { scale: 0.96 } : {}}
              className={`bg-gradient-to-r from-sky-400 to-blue-500 text-slate-900 py-3 rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 ${loading || !recaptchaToken ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading && <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin"></div>}
              {loading ? "Sending…" : "Send message"}
            </motion.button>

            {form.phone && (
              <a href={`https://wa.me/${formatPhone(form.phone)}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 bg-emerald-500/90 text-white py-3 rounded-full font-semibold hover:bg-emerald-500 transition">
                <FiMessageCircle /> Continue on WhatsApp
              </a>
            )}
          </form>
        </motion.div>

        {/* -------- CONTACT INFO WITH MAP -------- */}
        <motion.div variants={fadeUp} className="grid gap-6">
          {/* Location */}
          <motion.div whileHover={{ y: -4 }} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center">
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
          <motion.div whileHover={{ y: -4 }} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center">
              <FiMail />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-slate-400">Email</p>
              <a href="mailto:davidmarcus020808@gmail.com" className="font-semibold text-white hover:underline">
                davidmarcus020808@gmail.com
              </a>

            </div>
          </motion.div>

          {/* Phone */}
          <motion.div whileHover={{ y: -4 }} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center">
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
      <a href="https://api.whatsapp.com/send/?phone=2347081091762&text=Hi%2C%20I%20found%20your%20website%20and%20would%20like%20to%20discuss%20a%20project.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-full shadow-lg flex items-center gap-3 z-50 transition">
        <FiMessageCircle size={20} /> Contact via WhatsApp
      </a>

      <Footer />
    </div>
  );
}
