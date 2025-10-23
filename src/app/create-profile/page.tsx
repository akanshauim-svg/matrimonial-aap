"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser, User } from "../../context/UserContext";

type ProfileForm = {
  name: string;
  email: string;
  contact: string;
  age: string;
  location: string;
  profession: string;
  bio: string;
  password: string;
  confirmPassword: string;
  skills: string[];
  imageUrl?: string;
};

const availableSkills = [
  "JavaScript", "React", "Node.js", "TypeScript", "Python", "Dart",
  "Next.js", "HTML5", "CSS", "Java", "Angular", "Flutter", "MySQL",
  "SpringBoot", "MongoDB", "Postgresql", ".NET", "PHP"
];

export default function CreateProfilePage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageName, setSelectedImageName] = useState("No file chosen");

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProfileForm>({
    defaultValues: { skills: [] },
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<ProfileForm> = async (data) => {
    try {
      let imageUrl = "";
      if (selectedImage) {
        // just use object URL for preview, do not save locally
        imageUrl = URL.createObjectURL(selectedImage);
      }

      const skillsStr = data.skills.join(", ");

      const response = await fetch("/api/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, skills: skillsStr, imageUrl }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(`❌ ${result.message}`);
        return;
      }

      // ✅ Do NOT save in localStorage, just keep context (optional)
      const newUser: User = {
        id: result.profile.id,
        name: result.profile.name,
        email: result.profile.email,
        imageUrl: result.profile.imageUrl || "",
      };
      setUser(newUser);

      // ✅ Show confirmation dialog before redirecting
      const goToLogin = window.confirm("✅ Profile created successfully! Do you want to go to Login?");
      if (goToLogin) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Error creating profile:", err);
      alert("Something went wrong");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setSelectedImageName(file.name);
    } else {
      setSelectedImage(null);
      setSelectedImageName("No file chosen");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-2xl w-full max-w-3xl p-8 space-y-4"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Create Profile
        </h2>

        {/* Name, Email, Contact, Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register("name", { required: "Name required", minLength: { value: 3, message: "Min 3 chars" } })}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
              })}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              {...register("contact", { pattern: { value: /^[0-9]{10}$/, message: "10-digit number" } })}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              {...register("age", { required: "Age required", pattern: { value: /^[0-9]+$/, message: "Invalid age" } })}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>
        </div>

        {/* Location, Profession */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input {...register("location", { required: "Location required" })} className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400" />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profession</label>
            <input {...register("profession", { required: "Profession required" })} className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400" />
            {errors.profession && <p className="text-red-500 text-sm">{errors.profession.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 chars" } })}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", { validate: val => val === password || "Passwords do not match" })}
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea {...register("bio")} className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-2">Skills</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableSkills.map(skill => (
              <label key={skill} className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-gray-50">
                <input type="checkbox" value={skill} {...register("skills")} className="w-4 h-4 accent-blue-500" />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Profile Image</label>
          {selectedImage && (
            <div className="mb-2 relative w-32 h-32">
              <Image src={URL.createObjectURL(selectedImage)} alt="Preview" fill className="object-cover rounded-full border" />
            </div>
          )}
          <div className="relative border rounded-md p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
            <span className="text-gray-700">Choose Profile</span>
            <span className="text-gray-500">{selectedImageName}</span>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-3 rounded-md mt-4">
          Save Profile
        </button>

        {/* ✅ Already have account */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
