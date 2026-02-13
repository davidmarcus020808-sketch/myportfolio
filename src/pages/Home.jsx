import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CTA from "../components/CTA";

import ProjectsCarousel from "../components/ProjectsCarousel";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
        <CTA />
      <ProjectsCarousel />
      <Footer />
    </>
  );
}
