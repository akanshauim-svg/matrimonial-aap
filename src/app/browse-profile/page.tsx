"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  profession: string;
  bio: string;
  imageUrl?: string;
  skills?: string;
}

export default function BrowseProfilePage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const filter = searchParams?.get("filter") || "";
  const value = searchParams?.get("value") || "";

  
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const url = value
          ? `/api/browse-profile?filter=${filter}&value=${value}`
          : `/api/browse-profile`;
        const res = await fetch(url);
        const data = await res.json();
        setProfiles(data.users || []);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [filter, value]);

 
  
  const toggleLike = (id: number) => {
    setLikedProfiles((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  if (loading) return <p className="text-center mt-10">Loading profiles...</p>;

  if (profiles.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">
        No profiles found for this filter.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Browse Profiles</h1>

      <div className="flex flex-col gap-6">
        {profiles.map((user) => {
          const isLiked = likedProfiles.includes(user.id);
          return (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 hover:shadow-lg transition"
            >
             
             
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={user.imageUrl || "/default-avatar.png"}
                  alt={user.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>

             
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">
                  Age: {user.age} | {user.location}
                </p>
                <p className="text-gray-600">{user.profession}</p>
                <p className="mt-2 text-gray-700">{user.bio}</p>

                
                <div className="mt-3 text-gray-700">
                  <strong>Interests:</strong>{" "}
                  {user.skills && user.skills.trim() !== "" && user.skills}
                </div>
              </div>

            
              <button
                onClick={() => toggleLike(user.id)}
                className="flex items-center justify-center mt-3 sm:mt-0 sm:ml-auto"
              >
                <Heart
                  className={`w-7 h-7 transition-transform duration-200 ${
                    isLiked
                      ? "fill-red-500 stroke-red-500 scale-110"
                      : "stroke-gray-500 hover:stroke-red-500"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
