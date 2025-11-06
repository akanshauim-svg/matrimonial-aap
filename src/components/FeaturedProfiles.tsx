"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Profile {
  id: number;
  name: string;
  age: number;
  city: string;
  profession: string;
  skills: string[];
  imageUrl: string;
}

export default function FeaturedProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filtered, setFiltered] = useState<Profile[]>([]);
  const [filter, setFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [professions, setProfessions] = useState<string[]>(["All"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        const profilesArray = Array.isArray(data) ? data : [];
        setProfiles(profilesArray);
        setFiltered(profilesArray);
        const uniqueProfs = Array.from(
          new Set(profilesArray.map((p) => p.profession || "Unknown"))
        );
        setProfessions(["All", ...uniqueProfs]);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (filter === "All") setFiltered(profiles);
    else setFiltered(profiles.filter((p) => p.profession === filter));
    setCurrentIndex(0);
  }, [filter, profiles]);

  const next = () => {
    if (currentIndex + visibleCount < filtered.length) {
      setCurrentIndex(currentIndex + visibleCount);
    }
  };

  const prev = () => {
    if (currentIndex - visibleCount >= 0) {
      setCurrentIndex(currentIndex - visibleCount);
    }
  };

  return (
    <section className="w-full bg-[#fdfaf5] py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Featured Profiles
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Meet our most popular tech professionals. All profiles are verified and ready to connect.
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center sm:justify-end mb-6 relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm sm:text-base transition-all"
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            Filter: {filter}
          </button>

          {showFilter && (
            <div className="absolute top-12 sm:top-14 right-0 bg-white border rounded-lg shadow-lg w-44 sm:w-52 z-20">
              {professions.map((prof) => (
                <button
                  key={prof}
                  onClick={() => {
                    setFilter(prof);
                    setShowFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm sm:text-base ${
                    prof === filter ? "bg-purple-100" : "hover:bg-gray-100"
                  }`}
                >
                  {prof}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Left Arrow */}
          {currentIndex > 0 && (
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition-all z-20"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Right Arrow */}
          {currentIndex + visibleCount < filtered.length && (
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition-all z-20"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Sliding Profiles */}
          <motion.div
            className="flex gap-6 sm:gap-8 mx-auto"
            style={{ maxWidth: "90%" }}
            animate={{ x: -currentIndex * (100 / visibleCount) + "%" }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="shrink-0 w-[calc(25%-18px)] bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden"
              >
                <div className="relative h-44 sm:h-52 w-full">
                  <Image
                    src={p.imageUrl || "/default-profile.jpg"}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-800">
                    {p.name}, {p.age}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">{p.city}</p>
                  <span className="inline-block mt-2 bg-purple-100 text-purple-700 text-xs sm:text-sm font-medium px-2 py-1 rounded-full">
                    {p.profession}
                  </span>

                  <Link
                    href={`/browse-profile?id=${p.id}`}
                    className="block mt-3 text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg text-sm sm:text-base transition-all"
                  >
                    View More
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
