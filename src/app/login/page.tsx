"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      // Save user in localStorage and context
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      setUser(data.user);

      // Redirect to profile page
      router.push("/profile");
    } catch (err) {
      console.error("Login failed", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-purple-700">
          Login
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
        >
          Login
        </button>

        {/* Create Profile link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            {"Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => router.push("/create-profile")}
              className="text-blue-600 hover:underline"
            >
              Create Profile
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
