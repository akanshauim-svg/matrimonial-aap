"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Heart, ChevronDown, } from "lucide-react";

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const features = [
    { icon: <Search className="w-10 h-10 text-pink-500" />, title: "Create Your Profile", description: "Set up and build your profile with your tech skills, interests, and preferences." },
    { icon: <Users className="w-10 h-10 text-pink-500" />, title: "Browse Matches", description: "Our algorithm finds compatible tech professionals based on skills, interests, and preferences." },
    { icon: <Heart className="w-10 h-10 text-pink-500" />, title: "Connect & Meet", description: "Chat with your matches, get to know each other, and take it forward at your own pace." },
  ];

  const accordions = [
    { title: "Finding a tech partner", description: "Browse profiles filtered by tech skills and interests." },
    { title: "Building my profile", description: "Add your tech stack and career achievements to stand out." },
    { title: "How matching works", description: "Our algorithm prioritizes shared technical interests." },
    { title: "Success stories", description: "Read about tech couples who met through DevShaadi." },
  ];

  return (
    <main className="flex flex-col w-full">
      
      
        

      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl font-bold mb-2">How DevShaadi Works</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Finding your perfect tech match is easy with our simple three-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-5 sm:p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <motion.div whileHover={{ scale: 1.2 }} className="mb-3 p-3 rounded-full bg-pink-100">
                {feature.icon}
              </motion.div>
              <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="py-10 px-3 sm:px-5 lg:px-7 flex justify-center">
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 border-2 border-gray-200 rounded-3xl bg-gray-50 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-6">What are you looking for?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accordions.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="border rounded-2xl bg-white shadow hover:shadow-md transition"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-5 py-3 text-left font-medium text-gray-800"
                >
                  {item.title}
                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-purple-500" />
                  </motion.div>
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="px-5 pb-3 text-gray-600 bg-gray-100 rounded-b-2xl text-sm sm:text-base"
                  >
                    {item.description}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
