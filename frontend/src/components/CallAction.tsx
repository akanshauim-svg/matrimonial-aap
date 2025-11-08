"use client";

import Image from "next/image";

export default function CallAction() {
  return (
    <section className="relative w-full text-center py-16 text-black">
      
      
      <div className="absolute inset-0">
        <Image
          src="/uploads/wallpaper.jpeg" 
          alt="Background Wallpaper"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 drop-shadow-md">
          Ready to Find Your Perfect Tech Match?
        </h2>
        <p className="mb-6 text-lg sm:text-xl drop-shadow-sm">
          Join thousands of tech professionals who found their life partner on DevShaadi.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow hover:bg-purple-800 hover:scale-105 transition">
            Create Your Profile
          </button>
          <button className="px-6 py-3 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
