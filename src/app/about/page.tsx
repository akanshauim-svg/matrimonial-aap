"use client";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
   
      <nav className="h-16 bg-white shadow-md"></nav>

    
      <main className="flex-1">
       

        <section className="bg-gradient-to-r from-purple-500 to-pink-400 text-white py-16 text-center">
          <h1 className="text-4xl font-bold">About DevShaadi</h1>
          <p className="mt-2 text-lg">
            Connecting tech professionals for meaningful relationships since 2022
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Our Story</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            DevShaadi was founded in 2022 by a group of tech professionals who experienced
            firsthand the challenges of finding partners who understand the unique lifestyle
            and interests of people in the tech industry.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Having faced the challenges of busy schedules, specialized interests, and the
            difficulties of meeting like-minded individuals, our founders created DevShaadi
            as a solution specifically designed for the tech community.
          </p>
          <p className="text-gray-700 leading-relaxed">
            What started as a small community has now grown into the leading matrimonial
            platform exclusively for developers, engineers, and tech professionals across
            the globe.
          </p>
        </section>

     
        <section className="bg-pink-50 py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
              <p className="text-gray-700 leading-relaxed">
                To create meaningful connections between tech professionals by providing a
                platform that understands their unique needs, interests, and lifestyle.
              </p>
              <p className="text-gray-700 leading-relaxed">
                At DevShaadi, we believe that shared professional backgrounds and interests
                can form the foundation of strong, lasting relationships. Our platform is
                designed to match individuals based on their tech specialties, career
                aspirations, and personal interests, creating connections that go beyond
                surface-level compatibility.
              </p>
            </div>
          </div>
        </section>
      </main>

      
      <footer className="h-16 bg-gray-100"></footer>
    </div>
  );
}
