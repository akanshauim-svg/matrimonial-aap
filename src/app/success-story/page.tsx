"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Story {
  id: number;
  name: string;
  partnerName: string;
  storyText: string;
  dateOfMatch: string;
  imageUrl?: string;
}

interface ApiStory {
  id: number;
  name: string;
  partnerName: string;
  story: string;
  dateMet: string;
  image?: string | null;
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const MAX_VISIBLE = 3; 

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("/api/success-story");
        const data = await res.json();

        const formatted = (data as ApiStory[] || []).map((s) => ({
          id: s.id,
          name: s.name,
          partnerName: s.partnerName,
          storyText: s.story,
          dateOfMatch: s.dateMet,
          imageUrl: s.image || undefined,
        }));

        setStories(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStories();
  }, []);

  if (stories.length === 0) {
    return (
      <p className="text-center mt-12 text-gray-500">
        No success stories yet!
      </p>
    );
  }

  const visibleStories = showAll ? stories : stories.slice(0, MAX_VISIBLE);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Success Stories
      </h1>

      {visibleStories.map((story) => (
        <div
          key={story.id}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row gap-4"
        >
          {story.imageUrl ? (
            <div className="w-32 h-32 relative flex-shrink-0 rounded-full overflow-hidden">
              <Image src={story.imageUrl} alt="Couple" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl flex-shrink-0">
              {story.name.charAt(0)}&{story.partnerName.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              {story.name} & {story.partnerName}
            </h2>
            <p className="text-gray-500 text-sm mb-2">
              Matched in {new Date(story.dateOfMatch).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{story.storyText}</p>
          </div>
        </div>
      ))}

      {stories.length > MAX_VISIBLE && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition-colors mb-4"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      
      <div className="text-center mt-6">
        <button
          onClick={() => router.push("/share-story-form")}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Share Your Story
        </button>
      </div>
    </div>
  );
}
