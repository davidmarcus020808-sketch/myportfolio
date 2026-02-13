import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Projects() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const lastScrollY = useRef(0);
  const [showFilter, setShowFilter] = useState(true);
  const [showBackBtn, setShowBackBtn] = useState(false);
  const y = useMotionValue(0);

  /* === NEW: dynamic measurement refs === */
  const filterRef = useRef(null);
  const [navHeight, setNavHeight] = useState(64);
  const [filterHeight, setFilterHeight] = useState(80);

  const closeModal = () => setActiveProject(null);

  /* ================= FETCH ================= */
  /* ================= SCROLL (filter + back button) ================= */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      // compute new visibility for filter (smart hide when scrolling down past threshold)
      const newShowFilter = !(current > lastScrollY.current && current > 120);
      setShowFilter(newShowFilter);

      // back button should appear when navbar/filter is hidden (i.e., newShowFilter === false)
      setShowBackBtn(!newShowFilter);

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* === NEW: Measure navbar & filter heights === */
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      setNavHeight(header ? Math.ceil(header.getBoundingClientRect().height) : 64);
      setFilterHeight(
        filterRef.current ? Math.ceil(filterRef.current.getBoundingClientRect().height) : 80
      );
    };

    measure();
    window.addEventListener("resize", measure);

    const ro = new ResizeObserver(() => measure());
    if (filterRef.current) ro.observe(filterRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      if (filterRef.current) ro.disconnect();
    };
  }, []);
  

  /* === NEW: Small-screen navbar override (forces compact single-line layout) ===
     We inject a small CSS override targeting header so the navbar is compact on mobile.
     If your Navbar uses a very different structure, I can adapt the selector. */
  useEffect(() => {
    const styleId = "projects-page-navbar-compact-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        /* compact navbar for small screens */
        @media (max-width: 640px) {
          header {
            padding-top: 6px !important;
            padding-bottom: 6px !important;
            min-height: 48px !important;
          }
          /* try to make nav items show inline — adapt if your Navbar uses custom classes */
          header nav, header ul, header .nav, header .nav-items {
            display: flex !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            gap: 0.5rem !important;
          }
          header nav li, header ul li {
            display: inline-flex !important;
            margin: 0 6px !important;
          }
          /* shrink nav links a bit */
          header a {
            padding: 6px 8px !important;
            font-size: 14px !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await axiosClient.get("projects/");
      console.log("Projects fetched:", res.status, res.data); // <-- ADD THIS
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchProjects();
}, []);


  /* ================= BODY LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "auto";
  }, [activeProject]);

  /* ================= ESC CLOSE ================= */
 useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && closeModal();
    if (activeProject) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [activeProject]);

/* === SAFE CATEGORIES (trimmed + unique) === */
const categories = useMemo(() => {
  const cats = Array.from(
    new Set(
      projects
        .map((p) => (p.category || "").toString().trim())
        .filter(Boolean)
    )
  );
  return ["All", ...cats];
}, [projects]);


/* === NORMALIZED FILTERING (prevents disappearing grids) === */
const filteredProjects = useMemo(() => {
  const normalizedFilter = (filter || "All").toString().trim().toLowerCase();
  const normalizedSearch = (search || "").toString().trim().toLowerCase();

  return projects.filter((p) => {
    const projectCategory = (p.category || "").toString().trim().toLowerCase();
    const projectTitle = (p.title || "").toLowerCase();

    if (normalizedFilter !== "all" && projectCategory !== normalizedFilter) return false;
    if (normalizedSearch && !projectTitle.includes(normalizedSearch)) return false;
    return true;
  });
}, [projects, filter, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="relative bg-slate-50 min-h-screen overflow-x-hidden">

      {/* BACK BUTTON (animated) */}
      <AnimatePresence>
        {showBackBtn && (
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed top-5 left-5 z-50 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md shadow-md text-slate-700 font-semibold"
          >
            ← Back
          </motion.button>
        )}
      </AnimatePresence>

      {/* MAIN SCALE WHEN MODAL OPEN */}
      <motion.div
        animate={
          activeProject
            ? { scale: 0.96, filter: "blur(8px)" }
            : { scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.35 }}
      >
        <Navbar />
{/* ================= FILTER + SEARCH + HEADING ================= */}
<AnimatePresence>
  {showFilter && (
    <motion.div
      ref={filterRef}
      initial={{ y: -140, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -140, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{ top: navHeight }}
      className="fixed left-0 right-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white/90 backdrop-blur-md py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-b-xl shadow-md border border-white/20">
          {/* Categories */}
          <div className="w-full sm:w-auto">
            <div className="flex gap-3 flex-wrap items-center py-2 px-1">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setSearch(""); // prevents leftover search causing empty grid
                  }}
                  layout
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-3 sm:px-5 py-2 rounded-full text-sm sm:text-sm font-semibold transition-all duration-200 ${
                    filter === cat
                      ? "text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg"
                      : "text-slate-700 bg-white/80 border border-white/30 hover:shadow-md"
                  }`}
                >
                  {cat}
                  {filter === cat && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
                      style={{ position: "relative" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="mt-2 sm:mt-0 w-full sm:w-64">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-xl border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent w-full bg-white/90 backdrop-blur-md"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

{/* ================= HEADING ================= */}
{/* ================= HEADING ================= */}
<section
  style={{
    paddingTop: `${
      navHeight +
      filterHeight +
      (isMobile ? 170 : 65)
    }px`,
  }}
  className="pb-12 px-6 text-center max-w-4xl mx-auto"
>
  <h1 className="text-3xl sm:text-6xl md:text-5xl font-extrabold mb-1">
    Projects & Case Studies
  </h1>

  <p className="text-slate-600 text-sm sm:text-2xl">
    A selection of elite digital products I’ve designed and built.
  </p>
</section>






{/* GRID: additional spacing below filter/hero */}
<section className="max-w-[1500px] mx-auto px-4 sm:px-8 pb-40 pt-6">
  <motion.div
    key={filter} // <-- force re-render when filter changes
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      xl:grid-cols-4
      gap-6
      sm:gap-8
      xl:gap-12
    "
  >
    {filteredProjects.map((project) => (
      <motion.article
        key={project.id} // slug is fine
        layout // <-- enables smooth layout transitions
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        whileHover={{ y: -8 }}
        onClick={() => setActiveProject(project)}
        className="group relative rounded-2xl overflow-hidden bg-black shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
      >
        <div className="relative h-56 sm:h-64 md:h-72 xl:h-80 overflow-hidden">
          {project.video && (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
            />
          )}

          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="p-4 sm:p-6 relative z-10 text-white">
          <span className="text-xs uppercase text-sky-400 font-bold">
            {project.category}
          </span>
          <h3 className="text-base sm:text-lg font-bold mt-2">
            {project.title}
          </h3>
        </div>
      </motion.article>
    ))}
  </motion.div>
</section>

<Footer />

      </motion.div>

{/* ================= MODAL ================= */}
<AnimatePresence>
  {activeProject && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={closeModal}
    >
      {/* MODAL PANEL */}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative w-full h-full bg-white overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="fixed top-6 right-6 z-50 
                     w-12 h-12 
                     flex items-center justify-center 
                     rounded-full 
                     bg-white/90 backdrop-blur-md 
                     shadow-xl 
                     border border-slate-200
                     hover:scale-110 
                     active:scale-95
                     transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-24">

          <h2 className="text-3xl sm:text-4xl font-bold">
            {activeProject.title}
          </h2>

          <p className="mt-4 text-slate-600 max-w-3xl">
            {activeProject.description}
          </p>

          {/* MAIN MEDIA */}
          {activeProject.video && (
            <video
              src={activeProject.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full mt-10 rounded-2xl object-cover shadow-lg"
            />
          )}

          {/* FEATURES */}
          {activeProject.features?.length > 0 && (
            <div className="mt-14">
              <h3 className="text-xl font-semibold mb-6">
                Key Features
              </h3>

              <ul className="grid sm:grid-cols-2 gap-4">
                {activeProject.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-700 font-medium"
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* BUILT GRID */}
          {activeProject.built?.length > 0 && (
            <div className="mt-20">
              <h3 className="text-xl font-semibold mb-8">
                Built Components
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-10">
                {activeProject.built.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white"
                  >
                    <div className="h-52 md:h-56 xl:h-64 overflow-hidden">
                      {item.video ? (
                        <video
                          src={item.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                      )}
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold">
                        {item.title}
                      </h4>

                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold hover:scale-105 transition"
                        >
                          View Live →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
