"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext"; // adjust path according to your project

export default function ShareStoryPage() {
  const router = useRouter();
  const { user } = useUser();

  const [form, setForm] = useState({
    name: "",
    partnerName: "",
    storyText: "",
    dateOfMatch: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to share a story.");
      return;
    }

    try {
      const res = await fetch("/api/success-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: user.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to share story");
        return;
      }

      alert("Your story has been shared! 🎉");
      router.push("/success-story"); // redirect to stories page
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Share Your Success Story</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-3 mb-4 w-full rounded"
        />
        <input
          type="text"
          name="partnerName"
          placeholder="Partner's Name"
          value={form.partnerName}
          onChange={handleChange}
          required
          className="border p-3 mb-4 w-full rounded"
        />
        <input
          type="date"
          name="dateOfMatch"
          value={form.dateOfMatch}
          onChange={handleChange}
          required
          className="border p-3 mb-4 w-full rounded"
        />
        <textarea
          name="storyText"
          placeholder="Write your story..."
          value={form.storyText}
          onChange={handleChange}
          required
          className="border p-3 mb-4 w-full rounded"
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={handleChange}
          className="border p-3 mb-4 w-full rounded"
        />
        <button
          type="submit"
          className="bg-purple-500 text-white px-6 py-3 rounded w-full hover:bg-purple-600 transition"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
}
