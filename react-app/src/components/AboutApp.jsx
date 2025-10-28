import React from "react";

export default function AboutApp() {
  return (
    <section className="relative py-16 md:py-24 w-full  bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Why <span className="text-[#06b6d4]">Ticketly</span>?
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          A new way to manage your tickets, designed for clarity and efficiency.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm">
            <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
              <img
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                src="/about-1.jpg"
                alt="Streamlined Workflow"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Elevate Customer Experience{" "}
            </h3>
            <p className="text-gray-600 text-center">
              Deliver faster, smarter support with a ticketing system built to
              anticipate user needs and personalize every interaction.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm">
            <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
              <img
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                src="/about-2.jpg"
                alt="Collaborative Tools"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Automate Routine Tasks
            </h3>
            <p className="text-gray-600 text-center">
              Save valuable time by automating repetitive actions — from ticket
              routing to follow-ups — so your team stays focused on impact.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm">
            <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
              <img
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                src="/about-3.jpg"
                alt="Efficient Tracking"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Gain Actionable Insights
            </h3>
            <p className="text-gray-600 text-center">
              Turn data into decisions with real-time analytics that reveal
              performance trends and uncover opportunities for improvement.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-80px] right-[-100px] w-30 h-30 bg-slate-500 bg-opacity-10 rounded-full z-0 animate-pulse-slow"></div>
      <div className="absolute top-[-60px] left-[-70px] w-40 h-40 bg-slate-500 bg-opacity-10 rounded-full z-0 animate-pulse-medium"></div>
    </section>
  );
}
