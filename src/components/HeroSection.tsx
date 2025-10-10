"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-pink-400 via-purple-400 to-purple-600 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Find Your Perfect Tech Match
          </h1>
          <p className="text-lg mb-8">
            The #1 matrimony platform exclusively for developers, engineers, and
            tech professionals. Build your future with someone who speaks your
            language.
          </p>

          <div className="flex gap-4 mb-8">
            <Link
              href="/create-profile"
              className="bg-white text-purple-700 px-6 py-3 rounded font-semibold hover:bg-gray-200 transition"
            >
              Create Profile
            </Link>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-3 rounded text-black w-52"
            />
          </div>

          
          <div className="bg-white/20 p-4 rounded-lg inline-block">
            <h2 className="font-semibold mb-3">Quick Search:</h2>
            <div className="flex flex-wrap gap-3">
              {["Frontend Developer", "Backend Developer", "Quality Assurance","Data Scientist", "DevOps", "Full Stack"].map(
                (role) => (
                  <span
                    key={role}
                    className="bg-white/30 px-3 py-1 rounded-full text-sm hover:bg-yellow-300 hover:text-black cursor-pointer transition"
                  >
                    {role}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        
        <div className="flex-1 grid grid-cols-2 gap-6">
          {[
            { number: "1000+", label: "Tech Professionals" },
            { number: "50+", label: "Success Stories" },
            { number: "98%", label: "Response Rate" },
            { number: "20+", label: "Countries" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/20 p-6 rounded-lg text-center hover:bg-yellow-300 hover:text-black transition shadow"
            >
              <h2 className="text-2xl font-bold">{item.number}</h2>
              <p className="text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
