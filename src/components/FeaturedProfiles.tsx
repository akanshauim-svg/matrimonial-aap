"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";
import Image from "next/image";

export interface Profile {
  id: number;
  name: string;
  professions: string[];
  image: string;
}

interface FeaturedProfilesProps {
  profiles: Profile[];
}

export default function FeaturedProfiles({ profiles }: FeaturedProfilesProps) {
  const [selectedProfession, setSelectedProfession] = useState<string>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  
  const dropdownOptions = ["All", "Frontend", "Data Science", "QA", "Backend"];

  
  
  const filteredProfiles =
    selectedProfession === "All"
      ? profiles
      : profiles.filter(profile =>
          profile.professions.includes(selectedProfession)
        );

  
        
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="px-4 md:px-8 py-10 bg-gray-50">
      
      
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold mb-2">Featured Profiles</h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          Explore top professionals across different domains. Use the filter below to find profiles that match your interest.
        </p>
      </motion.div>

      
      
      <div className="flex justify-center mb-8 relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 text-sm transition z-20 relative"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Filter size={16} />
          {selectedProfession}
          <motion.span
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            className="transition-transform"
          >
            <ChevronDown size={16} />
          </motion.span>
        </button>

        
        
        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-30"
            >
              {dropdownOptions.map(option => (
                <li
                  key={option}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    selectedProfession === option ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => {
                    setSelectedProfession(option);
                    setDropdownOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      
      
      {filteredProfiles.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {filteredProfiles.map(profile => (
            <motion.div
              key={profile.id}
              className="relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 flex flex-col justify-end p-2 opacity-0 hover:opacity-100 transition text-xs">
                <p className="text-white">{profile.professions.join(", ")}</p>
              </div>
              <div className="p-2 text-center">
                <h3 className="font-medium text-sm">{profile.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500 text-center py-10 text-sm font-medium">
          {selectedProfession === "All"
            ? "No profiles to display."
            : `No profiles related to ${selectedProfession}.`}
        </p>
      )}
    </section>
  );
}
