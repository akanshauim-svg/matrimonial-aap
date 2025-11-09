"use client";
import { useState } from "react";

type Props = {
  profileUrl: string;
};

export default function SocialShare({ profileUrl }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-4 flex flex-col items-center">
      <button
        onClick={() => setShow(!show)}
        className="bg-blue-500 text-white p-2 w-40 rounded hover:bg-blue-600 transition"
      >
        Share Profile ⬇
      </button>

      {show && (
        <div className="flex gap-2 mt-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent("Check my profile: " + profileUrl)}`}
            target="_blank"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`}
            target="_blank"
            className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`}
            target="_blank"
            className="bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600 transition"
          >
            Twitter
          </a>
        </div>
      )}
    </div>
  );
}
