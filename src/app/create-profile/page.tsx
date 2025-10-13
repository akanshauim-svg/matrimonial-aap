"use client";
import Image from "next/image"; 
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

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
  profile_image_url?: string;
};

const availableSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "Dart",
  "Next.js",
  "HTML5",
  "CSS",
  "Java",
   "Angular",
  "Flutter",
  "MYSQl",
  "SpringBoot",
  "MongoDB",
  "Postgresql",
  ".NET",
  "PHP"
];

export default function CreateProfilePage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [selectedImageName, setSelectedImageName] = React.useState("No file chosen");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: { skills: [] },
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<ProfileForm> = async (data) => {
    try {
     
      
      
      let imageUrl = "";
      if (selectedImage) {

        // supabase upload later
        imageUrl = URL.createObjectURL(selectedImage);
      }

      const response = await fetch("/api/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, profile_image_url: imageUrl }),
      });

      const result = await response.json();

      if (response.ok) {


        alert("✅ Profile created successfully!");
        router.push("/login");
      } else {
        alert(`❌ ${result.message}`);
      }

    } catch (error) {
      console.error("Error:", error);
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
        className="bg-white shadow-md rounded-2xl w-full max-w-3xl p-8"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Create Profile
        </h2>

     
        <div className="space-y-4">
         
         
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "At least 3 characters" },
              })}
              placeholder="Enter full name"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

         
         
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter valid email",
                },
              })}
              placeholder="Enter email"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>


          <div>
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              {...register("contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10-digit number",
                },
              })}
              placeholder="Contact number"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
          </div>

         
         
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              {...register("age", {
                required: "Age is required",
                pattern: { value: /^[0-9]+$/, message: "Enter a valid age" },
              })}
              placeholder="Enter age"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
          </div>

         
         
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              placeholder="Enter location"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

         
         

          <div>
            <label className="block text-sm font-medium mb-1">Profession</label>
            <input
              {...register("profession", { required: "Profession is required" })}
              placeholder="Enter profession"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.profession && (
              <p className="text-red-500 text-sm mt-1">{errors.profession.message}</p>
            )}
          </div>

        
        

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              placeholder="Password"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>



          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              placeholder="Confirm password"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

        
        
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              {...register("bio", {
                maxLength: { value: 200, message: "Max 200 characters allowed" },
              })}
              placeholder="Tell us about yourself"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
          </div>

       
       
          <div>
            <label className="block text-sm font-medium mb-2">Skills</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {availableSkills.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    value={skill}
                    {...register("skills", {
                      validate: (val) => val.length > 0 || "Select at least one skill",
                    })}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
            {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            {selectedImage && (
  <div className="mb-2 relative w-32 h-32">
    <Image
      src={URL.createObjectURL(selectedImage)}
      alt="Profile Preview"
      fill
      className="object-cover rounded-full border"
    />
  </div>
)}
            <div className="relative border rounded-md p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="text-gray-700">Choose Profile</span>
              <span className="text-gray-500">{selectedImageName}</span>
            </div>
          </div>
        </div>

      
      

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-3 rounded-md transition-all duration-200 mt-6"
        >
          Save Profile
        </button>

       
       

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
