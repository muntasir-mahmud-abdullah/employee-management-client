import React from "react";
import {Link} from "react-router-dom"
const HeroSection = () => (
  <section className="relative bg-gradient-to-br from-[#4283f1] to-blue-500 dark:from-gray-900 dark:to-gray-800 text-white">
    {/* Background overlay */}
    <div className="absolute inset-0 bg-black opacity-40 dark:opacity-50"></div>

    <div className="relative container mx-auto px-6 py-32 flex flex-col lg:flex-row items-center lg:justify-between">
      
      {/* Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Streamline Your Team’s Workflow
        </h1>
        <p className="text-lg md:text-xl max-w-lg mx-auto lg:mx-0">
          Empower employees, simplify HR processes, and get real‑time insights—all in one secure platform.
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 mt-6">
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-[#4284f1] hover:bg-blue-600 focus:ring-4 focus:ring-green-300 text-white font-semibold rounded-lg transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
