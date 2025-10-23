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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      <div className="flex gap-3 items-center">
        {user ? (
          <>
            <Link href={ROUTES.profile}>
              <div className="w-10 h-10 relative rounded-full border-2 border-purple-500 hover:border-black cursor-pointer overflow-hidden">
                <Image
                  src={user.imageUrl || "/default-avatar.png"} 
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
    </nav>
  );
}
