"use client";

import { useState } from "react";
import {
  Search,
  User,
  Shield,
  MessageSquare,
  AlertTriangle,
  CreditCard,
  Heart,
} from "lucide-react";

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      title: "Account & Profile",
      icon: <User className="w-5 h-5 text-purple-600" />,
      questions: [
        "How do I create an account?",
        "How can I update my profile information?",
        "Can I change my email address?",
        "How do I reset my password?",
      ],
    },
    {
      title: "Browsing & Matching",
      icon: <Heart className="w-5 h-5 text-pink-500" />,
      questions: [
        "How does the matching algorithm work?",
        "Can I filter profiles by specific criteria?",
        "Why am I not getting matches?",
        "How can I improve my match results?",
      ],
    },
    {
      title: "Communication",
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
      questions: [
        "How do I send a message to a match?",
        "Can I send photos in messages?",
        "Why can’t I message certain profiles?",
        "Are my conversations private?",
      ],
    },
    {
      title: "Technical Issues",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      questions: [
        "The app is crashing, what should I do?",
        "Why am I having trouble uploading photos?",
        "How do I clear the app cache?",
        "Why am I getting error messages?",
      ],
    },
    {
      title: "Privacy & Safety",
      icon: <Shield className="w-5 h-5 text-green-600" />,
      questions: [
        "How is my data protected?",
        "Can I block someone?",
        "How do I report inappropriate behavior?",
        "Who can see my profile information?",
      ],
    },
    {
      title: "Billing & Subscription",
      icon: <CreditCard className="w-5 h-5 text-yellow-600" />,
      questions: [
        "How do I upgrade to Premium?",
        "Can I get a refund?",
        "How do I cancel my subscription?",
        "What payment methods are accepted?",
      ],
    },
  ];

  // Filter FAQs based on search input
  const filteredFaqs = faqs
    .map((faq) => ({
      ...faq,
      questions: faq.questions.filter((q) =>
        q.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (faq) =>
        faq.questions.length > 0 ||
        faq.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-white">
     
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 py-12 text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-2">Help Center</h1>
        <p className="text-sm sm:text-base max-w-xl mx-auto">
          Find answers to common questions and get the support you need
        </p>

       
        <div className="relative w-11/12 sm:w-1/2 mx-auto mt-6">
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-gray-800 placeholder-gray-400 p-3 rounded-lg pr-10 border border-gray-200 focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h2>

        {filteredFaqs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl border border-gray-100 p-6 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
               
                <div className="flex items-center gap-2 mb-3">
                  {faq.icon}
                  <h3 className="font-semibold text-lg text-purple-700">
                    {faq.title}
                  </h3>
                </div>

                <ul className="space-y-2 text-gray-700 text-sm">
                  {faq.questions.map((q, i) => (
                    <li
                      key={i}
                      className="border-b border-gray-100 pb-2 hover:text-purple-600 cursor-default"
                    >
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No results found for “{searchTerm}”.
          </p>
        )}

        {/* Contact Section */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-2">Still Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is available 24/7 to assist you with any
            questions or concerns you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transform transition duration-300 hover:-translate-y-1">
              Contact Support
            </button>
            <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transform transition duration-300 hover:-translate-y-1">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
