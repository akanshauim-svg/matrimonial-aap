export default function CallAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center">
      <h2 className="text-3xl font-bold mb-2">Ready to Find Your Perfect Tech Match?</h2>
      <p className="mb-6 text-lg">
        Join thousands of tech professionals who found their life partner on DevShaadi.
      </p>
      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow hover:scale-105 transition">
          Create Your Profile
        </button>
        <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-purple-600 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
