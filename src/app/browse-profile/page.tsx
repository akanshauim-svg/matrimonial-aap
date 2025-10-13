"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

type User = {
  id: number;
  name: string;
  age: number;
  email: string;
  location?: string;
  profession?: string;
  bio?: string;
  imageUrl?: string;
};

export default function BrowseProfilePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/browse-profiles");
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const toggleWishlist = (id: number) => {
    const updated = wishlist.includes(id) ? wishlist.filter((i) => i !== id) : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Profiles</h1>
      {users.map((user) => (
        <div key={user.id} className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md overflow-hidden relative">
          <div className="relative w-full sm:w-56 h-64 sm:h-auto flex-shrink-0">
            <Image
              src={user.imageUrl || "/default-avatar.png"}
              alt={user.name}
              fill
              sizes="320px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between relative">
            <h2 className="text-xl font-semibold">{user.name}, {user.age}</h2>
            <p className="text-purple-700 font-medium">{user.profession}</p>
            <p className="text-gray-600">{user.location}</p>
            <p className="text-gray-500 mt-2 line-clamp-4">{user.bio}</p>

            <button
              type="button"
              onClick={() => toggleWishlist(user.id)}
              className="absolute bottom-3 right-3 text-red-500"
            >
              <Heart fill={wishlist.includes(user.id) ? "red" : "none"} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
