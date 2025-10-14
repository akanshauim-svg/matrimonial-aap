"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export type Story = {
  id: string | number;
  name: string;
  partnerName: string;
  story: string;
  dateMet: string;
  image?: string;
};

export default function SuccessStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch stories from existing API
  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("/api/success-story");
        if (!res.ok) throw new Error("Failed to fetch stories");
        const data: Story[] = await res.json();
        console.log("Fetched stories:", data);
        setStories(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchStories();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  }, [stories.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  
  
  useEffect(() => {
    if (stories.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [stories, nextSlide]);

  
  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.changedTouches[0].screenX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextSlide();
    else if (touchStartX - touchEndX < -50) prevSlide();
  };

  if (stories.length === 0)
    return <p className="text-center mt-12 text-gray-500">No success stories yet!</p>;

  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-2">Success Stories</h2>
      <p className="text-center text-gray-500 mb-8">
        Real couples who found their perfect match ❤️
      </p>

      <div
        className="relative flex items-center justify-center overflow-hidden"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300 transition z-20"
        >
          <FaChevronLeft />
        </button>

        

        {stories.map((story, index) => (
          <div
            key={story.id}
            className={`w-full max-w-3xl p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-6 items-center transition-opacity duration-700 absolute top-0 left-0 ${
              index === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="w-full md:w-1/3 relative aspect-[4/3] rounded-xl overflow-hidden">
              {story.image ? (
                <Image
                  src={story.image}
                  alt={`${story.name} & ${story.partnerName}`}
                  fill
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="bg-purple-100 text-purple-600 w-full h-full flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {story.name.charAt(0)}&{story.partnerName.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
              <p className="italic text-gray-700 mb-2">&quot;{story.story}&quot;</p>
              <h3 className="font-bold text-lg">
                {story.name} & {story.partnerName}
              </h3>
              <p className="text-gray-500">
                Matched in {new Date(story.dateMet).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300 transition z-20"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
