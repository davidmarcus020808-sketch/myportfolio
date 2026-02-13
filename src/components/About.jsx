import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// If your certificate is a PDF, you can convert it to PNG/JPG for preview
import certificateImg from "../assets/softwarecertificate.png"; // replace with your image path

export default function About() {
  return (
    <>
      <Navbar />

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            About Me
          </h1>
          <p className="text-slate-700 text-lg mb-8">
            Hi, I'm David Marcus, a passionate software developer focused on building web applications with React, Django, and modern technologies.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            My Software Certificate
          </h2>
          <p className="text-slate-600 mb-6">
            Here’s a certification I earned for my software development skills.
          </p>

          {/* Certificate preview */}
          <div className="flex justify-center mb-6">
            <img
              src={certificateImg}
              alt="Software Certificate"
              className="w-full max-w-md rounded-lg shadow-lg border border-slate-300"
            />
          </div>

          {/* Optional button to view/download */}
          <a
            href="/assets/softwarecertificate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-400 transition"
          >
            View Full Certificate
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
