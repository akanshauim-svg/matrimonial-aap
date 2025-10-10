"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
//import Link from "next/link";

interface Story {
  id: number;
  name: string;
  partnerName: string;
  storyText: string;
  dateOfMatch: string;
  imageUrl?: string;
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("/api/success-stories");
        const data = await res.json();
        setStories(data.stories || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStories();
  }, []);

  if (stories.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No success stories shared yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Success Stories</h1>
      {stories.map((s) => (
        <div key={s.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row gap-4">
          {s.imageUrl ? (
            <div className="w-32 h-32 relative flex-shrink-0 rounded-full overflow-hidden">
              <Image src={s.imageUrl} alt="Couple" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl flex-shrink-0">
              {s.name.charAt(0)}&{s.partnerName.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{s.name} & {s.partnerName}</h2>
            <p className="text-gray-500 text-sm mb-2">Matched in {new Date(s.dateOfMatch).getFullYear()}</p>
            <p className="text-gray-700">{s.storyText}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
