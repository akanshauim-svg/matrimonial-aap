"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function ShareStoryPage() {
  const router = useRouter();
  const { user } = useUser();

  const [form, setForm] = useState({
    name: "",
    partnerName: "",
    storyText: "",
    dateOfMatch: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in!");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("partnerName", form.partnerName);
    formData.append("storyText", form.storyText);
    formData.append("dateOfMatch", form.dateOfMatch);
    formData.append("userId", user.id.toString());
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch("/api/success-story", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to share story");

      alert("Story shared successfully!");
      router.push("/success-story");
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4 sm:px-6 lg:px-0">
      <h1 className="text-3xl font-bold mb-6 text-center">Share Your Success Story</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          name="partnerName"
          placeholder="Partner's Name"
          value={form.partnerName}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="date"
          name="dateOfMatch"
          value={form.dateOfMatch}
          onChange={handleChange}
          required
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <textarea
          name="storyText"
          placeholder="Write your story..."
          value={form.storyText}
          onChange={handleChange}
          required
          className="border p-3 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <div className="flex flex-col items-center gap-2">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full border mb-2"
            />
          )}
          <label className="w-full cursor-pointer bg-gray-100 border p-2 text-center rounded hover:bg-gray-200 transition">
            {imageFile ? "Change Image" : "Choose Image"}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

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
