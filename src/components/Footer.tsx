"use client";
import Link from "next/link";
import { FaWineGlassAlt, FaLinkedinIn } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Left Column */}
        <div>
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            DevShaadi <span className="text-pink-500">♡</span>
          </h2>
          <p className="mt-2 text-sm">
            The #1 matrimonial platform exclusively for tech professionals
          </p>
          <div className="flex gap-3 mt-4 text-lg">
            <a href="#" className="hover:text-pink-500">
              <FaWineGlassAlt />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/browse">Browse Profiles</Link></li>
            <li><Link href="/success-story">Success Stories</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Help Center</Link></li>
            <li><Link href="#">Safety Tips</Link></li>
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-white font-semibold mb-3">Download Our App</h3>
          <p className="text-sm mb-3">
            Get the DevShaadi mobile app for a better experience
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaDownload /> Download App
          </button>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-700 pt-4">
        © 2025 DevShaadi Clone. All rights reserved. <br />
        This is a demo project for educational purposes only. Not affiliated with the original DevShaadi.com.
      </div>
    </footer>
  );
}
