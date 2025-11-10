"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Story = {
  id: number;
  name: string;
  partnerName: string;
  storyText: string;
  dateOfMatch: string;
  imageUrl?: string;
};

export default function SuccessStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [current, setCurrent] = useState(0);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

  const fetchStories = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/stories`);
      if (!res.ok) throw new Error(`Failed to fetch stories`);
      const data = await res.json();
      setStories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching stories:", err);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === stories.length - 1 ? 0 : prev + 1));

  if (!stories.length)
    return (
      <p className="text-center mt-12 text-gray-500">No success stories yet!</p>
    );

  return (
    <section className="py-8 bg-[#faf8ff]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 px-6">
        {/* Left Side */}
        <div className="flex-1 md:flex-[0.4] text-left">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-1">
            Success Stories
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            Celebrate love that found its way through our platform. Read
            inspiring stories of couples who turned their matches into lifelong
            journeys.
          </p>

          <div className="flex justify-center md:justify-start mt-2">
            <Link
              href="/success-story"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition flex items-center gap-2 text-sm md:text-base"
            >
              Read More <FaChevronRight />
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-[0.65] relative w-full">
          <div className="relative w-full h-60 md:h-[280px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={stories[current].imageUrl || "/default-avatar.png"}
              alt={`${stories[current].name} & ${stories[current].partnerName}`}
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />

            {/* Left/Right Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition z-20"
            >
              <FaChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition z-20"
            >
              <FaChevronRight size={18} />
            </button>

            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-3 text-white text-xs md:text-sm">
              <p className="italic mb-1 text-sm md:text-base">
                &quot;{stories[current].storyText}&quot;
              </p>
              <h3 className="font-semibold text-sm md:text-lg">
                {stories[current].name} & {stories[current].partnerName}
              </h3>
              <p className="text-[10px] md:text-xs">
                {new Date(stories[current].dateOfMatch).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
