"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg, { PixelCrop } from "../utils/cropImage";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);

  
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      const res = await fetch(`/api/user/${user.id}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [user, setUser]);

  
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/");
  };


  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedPixels: PixelCrop) => setCroppedAreaPixels(croppedPixels),
    []
  );

  
  const handleSavePhoto = useCallback(async () => {
    if (imageSrc && user && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

        
        const res = await fetch("/api/user/update-photo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, profilePic: croppedImage }),
        });
        const updatedUser = await res.json();

        
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        setShowModal(false);
        setImageSrc(null);
      } catch (err) {
        console.error("Error saving cropped image:", err);
      }
    }
  }, [imageSrc, croppedAreaPixels, user, setUser]);

  return (
    <>
      <nav className="bg-white text-black px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-md">
        <div>
          <Link
            href="/"
            className="text-xl text-purple-700 font-bold hover:text-pink-300 transition"
          >
            DevShaadi
          </Link>
        </div>

        <div className="hidden sm:flex gap-6 text-sm sm:text-base">
          <Link href="/" className="hover:text-pink-300 transition">Home</Link>
          <Link href="/browse-profile" className="hover:text-pink-300 transition">Browse Profile</Link>
          <Link href="/success-story" className="hover:text-pink-300 transition">Success Story</Link>
          <Link href="/about" className="hover:text-pink-300 transition">About</Link>
        </div>

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <Link href="/profile">
                <div className="w-8 h-8 relative rounded-full border-2 border-purple-500 hover:border-pink-300 cursor-pointer overflow-hidden">
                  <Image
                    src={user.profilePic || "/default-avatar.png"}
                    alt="Profile"
                    fill
                    sizes="32px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>

              <button
                onClick={() => setShowModal(true)}
                className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
              >
                Edit
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="border border-purple-400 px-4 py-2 text-purple-700 rounded hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                href="/create-profile"
                className="bg-pink-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
              >
                Create Profile
              </Link>
            </>
          )}
        </div>
      </nav>

      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Update ProfilePic</h2>

            {!imageSrc ? (
              <input type="file" accept="image/*" onChange={onFileChange} />
            ) : (
              <div className="relative w-full h-64 bg-gray-100">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setImageSrc(null);
                }}
                className="px-4 py-2 rounded border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePhoto}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                disabled={!imageSrc}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
