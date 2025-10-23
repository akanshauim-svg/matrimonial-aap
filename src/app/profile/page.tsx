"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { useUser } from "../../context/UserContext";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaEnvelope, FaEnvelopeOpenText, FaPhone } from "react-icons/fa";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  age: number;
  location: string;
  profession: string;
  bio: string;
  contact: string;
  skills: string[];
  imageUrl?: string;
};

const availableSkills = [
  "JavaScript","React","Node.js","TypeScript","Flutter","Python","Dart",
  "Next.js","HTML5","CSS","Java","Angular","MongoDB","Postgresql","PHP"
];

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tempProfile, setTempProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch profile from backend
  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/user/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        const skillsArray = data.skills ? data.skills.split(",").map((s: string) => s.trim()) : [];
        setProfile({ ...data, skills: skillsArray });
        setTempProfile({ ...data, skills: skillsArray });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [user]);

  if (!profile) return <div className="text-center mt-10">Loading profile...</div>;

  const handleChange = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    if (!tempProfile) return;
    setTempProfile({ ...tempProfile, [field]: value });
  };

  const handleSave = async () => {
    if (!tempProfile) return;
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempProfile),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      const skillsArray = updated.skills ? updated.skills.split(",").map((s: string) => s.trim()) : [];
      setProfile({ ...updated, skills: skillsArray });
      setTempProfile({ ...updated, skills: skillsArray });
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile: " + (err instanceof Error ? err.message : ""));
    }
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!tempProfile || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setTempProfile({ ...tempProfile, imageUrl: base64 });

      // Save avatar immediately
      try {
        const res = await fetch("/api/user-photo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: tempProfile.id, imageUrl: base64 }),
        });
        if (!res.ok) throw new Error("Failed to save avatar");
        const updated = await res.json();
        setProfile(prev => prev ? { ...prev, imageUrl: updated.imageUrl } : prev);
      } catch (err) {
        console.error(err);
        alert("Error saving avatar: " + (err instanceof Error ? err.message : ""));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 mt-8">

      {/* Left section */}
      <div className="flex flex-col items-center md:items-start md:w-1/3">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 relative mb-4">
          <Image
            src={tempProfile?.imageUrl || "/default-avatar.png"}
            alt="Profile Avatar"
            width={192}
            height={192}
            className="rounded-full object-cover"
            unoptimized // ✅ important for base64
          />
          {editMode && (
            <label className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer text-white rounded-full transition">
              Change
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          )}
        </div>

        <h2 className="text-2xl font-bold">{tempProfile?.name}</h2>
        <p className="text-gray-600">{tempProfile?.profession}</p>

        <div className="mt-3 flex flex-col gap-2 text-gray-700">
          <div className="flex items-center gap-2">
            <FaEnvelopeOpenText /> <span>{tempProfile?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone /> <input
              type="text"
              value={tempProfile?.contact || ""}
              onChange={e => handleChange("contact", e.target.value)}
              disabled={!editMode}
              className={`border rounded-md p-1 ${!editMode ? "bg-transparent border-0" : ""}`}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-4">
          <a href={`https://wa.me/?text=Check out my profile!`} target="_blank"
            className="bg-green-500 p-3 rounded-full hover:bg-green-600 transform hover:scale-110 transition"><FaWhatsapp /></a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=#`} target="_blank"
            className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transform hover:scale-110 transition"><FaFacebookF /></a>
          <a href={`mailto:?subject=My Profile&body=Check out my profile!`} target="_blank"
            className="bg-red-500 p-3 rounded-full hover:bg-red-600 transform hover:scale-110 transition"><FaEnvelope /></a>
          <a href={`https://www.instagram.com/`} target="_blank"
            className="bg-pink-500 p-3 rounded-full hover:bg-pink-600 transform hover:scale-110 transition"><FaInstagram /></a>
        </div>

        <div className="mt-6">
          {!editMode ? (
            <button onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
              <FiEdit /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                <FiSave /> Save
              </button>
              <button onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
                <FiX /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="flex-1 mt-4 md:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Name</label>
          <input type="text" value={tempProfile?.name || ""} onChange={e => handleChange("name", e.target.value)} disabled={!editMode}
            className="border rounded-md w-full p-2" />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Age</label>
          <input type="number" value={tempProfile?.age || ""} onChange={e => handleChange("age", Number(e.target.value))} disabled={!editMode}
            className="border rounded-md w-full p-2" />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Location</label>
          <input type="text" value={tempProfile?.location || ""} onChange={e => handleChange("location", e.target.value)} disabled={!editMode}
            className="border rounded-md w-full p-2" />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Profession</label>
          <input type="text" value={tempProfile?.profession || ""} onChange={e => handleChange("profession", e.target.value)} disabled={!editMode}
            className="border rounded-md w-full p-2" />
        </div>

        <div className="col-span-full">
          <label className="block text-sm text-gray-500 mb-1">Bio</label>
          <textarea value={tempProfile?.bio || ""} onChange={e => handleChange("bio", e.target.value)} disabled={!editMode}
            className="border rounded-md w-full p-2 h-24" />
        </div>

        <div className="col-span-full">
          <label className="block text-sm text-gray-500 mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map(skill => (
              <label key={skill} className={`border px-3 py-1 rounded-md cursor-pointer text-sm ${tempProfile?.skills.includes(skill) ? "bg-blue-200" : "bg-gray-100"}`}>
                <input type="checkbox" checked={tempProfile?.skills.includes(skill) || false} disabled={!editMode} onChange={() => {
                  if (!tempProfile) return;
                  const skills = tempProfile.skills.includes(skill) ? tempProfile.skills.filter(s => s !== skill) : [...tempProfile.skills, skill];
                  handleChange("skills", skills);
                }} className="mr-1" />
                {skill}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
