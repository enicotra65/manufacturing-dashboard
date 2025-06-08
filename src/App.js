import React, { useRef } from "react";
import Dashboard from "./components/dashboard";
import heroVideo from "./hero.mp4";
import DarkModeToggle from "./components/darkModeToggle";

export default function App() {
  const dashboardRef = useRef(null);

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 left-4 z-50">
        <DarkModeToggle />
      </div>

      {/* Hero Section with Background Video */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="z-10 max-w-4xl">
          <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-400 mb-4 drop-shadow-lg">
            Welcome to FactoryFlow
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-200 max-w-xl mx-auto drop-shadow-sm">
            The smart manufacturing dashboard designed to simplify performance monitoring,
            analytics, and workflow — all in one intuitive interface.
          </p>
          <div className="mt-8">
            <button
              onClick={scrollToDashboard}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              View Dashboard
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
          {[
            {
              title: "Real-Time Metrics",
              description: "Live data streams to help you make better decisions, faster.",
            },
            {
              title: "Modular UI",
              description: "Clean, component-based layout designed with scalability in mind.",
            },
            {
              title: "Tailored Insights",
              description: "Built-in analytics and charts for better operational clarity.",
            },
          ].map(({ title, description }, i) => (
            <div
              key={i}
              className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">{title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Section */}
      <Dashboard ref={dashboardRef} />

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 z-20 relative">
        © 2025 FactoryFlow. Built by Evan Nicotra.
      </footer>
    </div>
  );
}
