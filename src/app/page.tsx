"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import FeaturedProfiles, { Profile } from "../components/FeaturedProfiles";
import BrowseProfileSection from "../components/BrowseProfileSection";
import SuccessStories from "../components/SuccessStories";
import CallAction from "../components/CallAction";


export default function HomePage() {
  const [profilesFromStorage, setProfilesFromStorage] = useState<Profile[]>([]);

  useEffect(() => {
    const storedProfiles = localStorage.getItem("profiles");
    if (storedProfiles) {
      setProfilesFromStorage(JSON.parse(storedProfiles));
    }
  }, []);

  return (
    <main className="flex flex-col w-full">
      
      <section className="relative">
        <HeroSection />
        <a
          href="#how-it-works"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce transition-transform duration-300 hover:scale-125"
        >
          ↓
        </a>
      </section>

<section id="how-it-works" className="bg-gray-50">
        <HowItWorks />
      </section>
      
       <FeaturedProfiles profiles={profilesFromStorage} />
       <BrowseProfileSection />
       <SuccessStories/>
       <CallAction/>
    </main>
  );
}
