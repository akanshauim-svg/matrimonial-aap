"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

type User = {
  id?: number; // Optional for new profiles
  name: string;
  email: string;
  age: number;
  location: string;
  profession: string;
  bio: string;
  contact: string;
  skills: string[];
  password: string;
  imageUrl?: string;
};

const availableSkills = [
  "JavaScript", "React", "Node.js", "TypeScript", "Flutter", "Python", "Dart",
  "Next.js", "HTML5", "CSS", "Java", "Angular", "MongoDB", "Postgresql", "PHP"
];

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser.id}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();

        // Convert skills string to array
        const skillsArray = data.skills ? data.skills.split(",").map((s: string) => s.trim()) : [];
        const userData: User = { ...data, skills: skillsArray };

        setUser(userData);
        setTempUser(userData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [router]);

  const handleSave = async () => {
    if (!tempUser) return;

    try {
      const res = await fetch(`/api/create-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempUser),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }

      const savedData = await res.json();
      

      
      const skillsArray = savedData.profile.skills
        ? savedData.profile.skills.split(",").map((s: string) => s.trim())
        : [];
      const updatedUser = { ...savedData.profile, skills: skillsArray };

      setUser(updatedUser);
      setTempUser(updatedUser);
      setEditMode(false);
      alert("Profile saved/updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving profile: " + (err instanceof Error ? err.message : err));
    }
  };

  const handleCancel = () => {
    setTempUser(user);
    setEditMode(false);
  };

  const handleChange = <K extends keyof User>(field: K, value: User[K]) => {
    if (!tempUser) return;
    setTempUser({ ...tempUser, [field]: value });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && tempUser) {
      const reader = new FileReader();
      reader.onload = () => setTempUser({ ...tempUser, imageUrl: reader.result as string });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!user) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FiEdit /> {editMode ? "Editing..." : "Edit Profile"}
        </button>
      </div>

      
      
      <div className="flex flex-col items-center mb-6 relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 mb-3 relative">
          <Image
            src={tempUser?.imageUrl || "/default-avatar.png"}
            alt="Profile Avatar"
            width={128}
            height={128}
            className="rounded-full object-cover"
          />
          {editMode && (
            <label className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-100 cursor-pointer text-white rounded-full transition">
              Change
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          )}
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(user).map((field) => {
          if (["imageUrl", "skills", "password"].includes(field)) return null;
          const key = field as keyof User;
          return (
            <div
              key={key}
              className="bg-white p-4 rounded shadow flex flex-col hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <span className="text-gray-500 text-sm mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              {editMode ? (
                <input
                  type="text"
                  value={tempUser ? tempUser[key] : ""}
                  onChange={(e) => handleChange(key, e.target.value as User[keyof User])}
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <span className="text-gray-800">{user[key]}</span>
              )}
            </div>
          );
        })}

        
        <div className="bg-white p-4 rounded shadow col-span-full">
          <span className="text-gray-500 text-sm mb-2">Skills</span>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => (
              <label
                key={skill}
                className={`border rounded-md p-2 cursor-pointer ${tempUser?.skills.includes(skill) ? "bg-blue-200" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={tempUser?.skills.includes(skill) || false}
                  disabled={!editMode}
                  onChange={() => {
                    if (!tempUser) return;
                    const skills = tempUser.skills.includes(skill)
                      ? tempUser.skills.filter((s) => s !== skill)
                      : [...tempUser.skills, skill];
                    handleChange("skills", skills);
                  }}
                  className="mr-1"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
      </div>

      
      {editMode && (
        <div className="mt-6 flex gap-3 flex-wrap">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <FiSave /> Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            <FiX /> Cancel
          </button>
        </div>
      )}

    
      <div className="mt-6 flex justify-center gap-6 text-white text-lg flex-wrap">
        <a href={`https://wa.me/?text=Check out my profile!`} target="_blank" className="bg-green-500 p-3 rounded-full hover:bg-green-600 transform hover:scale-110 transition"><FaWhatsapp /></a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=#`} target="_blank" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transform hover:scale-110 transition"><FaFacebookF /></a>
        <a href={`mailto:?subject=My Profile&body=Check out my profile!`} target="_blank" className="bg-red-500 p-3 rounded-full hover:bg-red-600 transform hover:scale-110 transition"><FaEnvelope /></a>
        <a href={`https://www.instagram.com/`} target="_blank" className="bg-pink-500 p-3 rounded-full hover:bg-pink-600 transform hover:scale-110 transition"><FaInstagram /></a>
      </div>
    </div>
  );
}
