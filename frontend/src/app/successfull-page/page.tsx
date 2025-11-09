import Link from "next/link";
export default function SuccessPage() {
  return (
    <div className="pt-24 flex flex-col items-center text-center px-4">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        🎉 Your profile has been created successfully!
      </h1>
      <p className="mb-6 text-gray-600">
        You can now log in to continue.
      </p>
      <Link
        href="/login"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
