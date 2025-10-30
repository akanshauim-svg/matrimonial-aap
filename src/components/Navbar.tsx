"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ROUTES = {
  home: "/",
  browseProfile: "/browse-profile",
  successStory: "/success-story",
  about: "/about",
  profile: "/profile",
  login: "/login",
  createProfile: "/create-profile",
};

export default function Navbar() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push(ROUTES.home);
  };

  return (
    <nav className="bg-white text-black px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-md">
      
      <div>
        <Link
          href={ROUTES.home}
          className="text-2xl font-bold text-purple-700 ml-4 hover:text-black transition"
        >
          DevShaadi
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-6 font-bold text-sm sm:text-base">
        <Link href={ROUTES.home} className="hover:underline hover:text-black transition">
          Home
        </Link>
        <Link href={ROUTES.browseProfile} className="hover:underline hover:text-black transition">
          Browse Profile
        </Link>
        <Link href={ROUTES.successStory} className="hover:underline hover:text-black transition">
          Success Story
        </Link>
        <Link href={ROUTES.about} className="hover:underline hover:text-black transition">
          About
        </Link>
      </div>

      {/* Desktop Btn */}
      <div className="hidden sm:flex gap-3 items-center">
        {user ? (
          <>
            <Link href={ROUTES.profile}>
              <div className="w-10 h-10 relative rounded-full border-2 border-purple-500 hover:border-black cursor-pointer overflow-hidden">
                <Image
                  src={user.imageUrl && user.imageUrl !== "" ? user.imageUrl : "/default-avatar.png"}
                  alt="Profile"
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href={ROUTES.login}
              className="border border-purple-400 px-4 py-2 text-purple-700 rounded hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              href={ROUTES.createProfile}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
            >
              Create Profile
            </Link>
          </>
        )}
      </div>

      {/* Hamburger Icon for mobile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="sm:hidden flex flex-col justify-center items-center w-8 h-8 border border-gray-400 rounded-md"
      >
        <div className={`h-0.5 w-5 bg-black transition-all ${showMenu ? "rotate-45 translate-y-1.5" : ""}`} />
        <div className={`h-0.5 w-5 bg-black my-1 transition-all ${showMenu ? "opacity-0" : ""}`} />
        <div className={`h-0.5 w-5 bg-black transition-all ${showMenu ? "-rotate-45 -translate-y-1.5" : ""}`} />
      </button>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-6 gap-4 sm:hidden font-semibold text-base z-40">
          <Link href={ROUTES.home} onClick={() => setShowMenu(false)} className="hover:text-purple-700">Home</Link>
          <Link href={ROUTES.browseProfile} onClick={() => setShowMenu(false)} className="hover:text-purple-700">Browse Profile</Link>
          <Link href={ROUTES.successStory} onClick={() => setShowMenu(false)} className="hover:text-purple-700">Success Story</Link>
          <Link href={ROUTES.about} onClick={() => setShowMenu(false)} className="hover:text-purple-700">About</Link>

          <div className="flex flex-col items-center gap-3 mt-4">
            {user ? (
              <>
                <Link href={ROUTES.profile} onClick={() => setShowMenu(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 relative rounded-full border border-purple-500 overflow-hidden">
                    <Image
                      src={user.imageUrl && user.imageUrl !== "" ? user.imageUrl : "/default-avatar.png"}
                      alt="Profile"
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMenu(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href={ROUTES.login}
                  onClick={() => setShowMenu(false)}
                  className="border border-purple-400 px-4 py-2 text-purple-700 rounded hover:bg-gray-200 transition"
                >
                  Login
                </Link>
                <Link
                  href={ROUTES.createProfile}
                  onClick={() => setShowMenu(false)}
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
                >
                  Create Profile
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
