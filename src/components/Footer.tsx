"use client";
import Link from "next/link";
import { FaWineGlassAlt, FaLinkedinIn } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

// ✅ Route constants for stability
const ROUTES = {
  home: "/",
  browseProfiles: "/browse-profiles",
  successStory: "/success-story",
  about: "/about",
  helpCenter: "/help-center",
  safetyTips: "/safety-tips",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-white text-xl font-bold flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            DevShaadi <span className="text-pink-500">♡</span>
          </h2>
          <p className="mt-2 text-sm">
            The #1 matrimonial platform exclusively for tech professionals
          </p>
          <div className="flex gap-3 mt-4 text-lg">
            <a href="#" className="hover:text-pink-500 transition-colors duration-300">
              <FaWineGlassAlt />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors duration-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={ROUTES.home} className="hover:text-pink-500 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href={ROUTES.browseProfiles} className="hover:text-pink-500 transition-colors duration-300">
                Browse Profiles
              </Link>
            </li>
            <li>
              <Link href={ROUTES.successStory} className="hover:text-pink-500 transition-colors duration-300">
                Success Stories
              </Link>
            </li>
            <li>
              <Link href={ROUTES.about} className="hover:text-pink-500 transition-colors duration-300">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={ROUTES.helpCenter} className="hover:text-pink-500 transition-colors duration-300">
                Help Center
              </Link>
            </li>
            <li>
              <Link href={ROUTES.safetyTips} className="hover:text-pink-500 transition-colors duration-300">
                Safety Tips
              </Link>
            </li>
            <li>
              <Link href={ROUTES.contact} className="hover:text-pink-500 transition-colors duration-300">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href={ROUTES.privacyPolicy} className="hover:text-pink-500 transition-colors duration-300">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Download Our App</h3>
          <p className="text-sm mb-3">
            Get the DevShaadi mobile app for a better experience
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            <FaDownload /> Download App
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-700 pt-4">
        © 2025 DevShaadi Clone. All rights reserved. <br />
        This is a demo project for educational purposes only. Not affiliated with the original DevShaadi.com.
      </div>
    </footer>
  );
}
