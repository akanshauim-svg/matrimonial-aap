"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Replace with your actual API later
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setMessage("Password reset link has been sent to your email.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-purple-700">
          Forgot Password
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}

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

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
        >
          Send Reset Link
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
