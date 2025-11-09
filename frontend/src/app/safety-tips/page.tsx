"use client";

import {
  Shield,
  Eye,
  MessageCircle,
  Car,
  AlertTriangle,
  Heart,
} from "lucide-react";

export default function SafetyTips() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-r from-purple-500 to-pink-400 py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Safety Tips</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Your safety is our top priority. Follow these guidelines for a secure
          and positive experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
          <Shield className="text-purple-500 w-8 h-8 mr-4 mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Protect Your Personal Information
            </h2>
            <p className="text-gray-600 text-sm">
              Never share sensitive personal details like your home address,
              financial information, or workplace details until you’ve
              established trust.
            </p>
          </div>
        </div>

        <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
          <Eye className="text-purple-500 w-8 h-8 mr-4 mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Meet in Public Places
            </h2>
            <p className="text-gray-600 text-sm">
              For your first few meetings, always choose public locations with
              plenty of people around. Inform a friend or family member about
              your plans.
            </p>
          </div>
        </div>

        <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
          <MessageCircle className="text-purple-500 w-8 h-8 mr-4 mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Take Time to Know Each Other
            </h2>
            <p className="text-gray-600 text-sm">
              Build trust gradually through conversations on our platform before
              moving to external communication or in-person meetings.
            </p>
          </div>
        </div>

        <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
          <Car className="text-purple-500 w-8 h-8 mr-4 mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Use Your Own Transportation
            </h2>
            <p className="text-gray-600 text-sm">
              Arrange your own transportation to and from your meeting location.
              This ensures you can leave whenever you want.
            </p>
          </div>
        </div>

        <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
          <Heart className="text-purple-500 w-8 h-8 mr-4 mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-2">Trust Your Instincts</h2>
            <p className="text-gray-600 text-sm">
              If something feels wrong or uncomfortable about a person or
              situation, don’t ignore that feeling. Your safety comes first.
            </p>
          </div>
        </div>

        <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
          <AlertTriangle className="text-purple-500 w-8 h-8 mr-4 mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Report Suspicious Behavior
            </h2>
            <p className="text-gray-600 text-sm">
              If someone is behaving inappropriately or suspiciously, use our
              reporting feature to alert our safety team immediately.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-red-50 border border-red-300 rounded-lg p-6 flex items-start transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <AlertTriangle className="text-red-500 w-8 h-8 mr-4 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Emergency Situations
            </h2>
            <p className="text-gray-700 text-sm mb-2">
              If you ever feel in danger or uncomfortable during a meeting,
              don’t hesitate to:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>Leave immediately — you don’t owe anyone an explanation.</li>
              <li>Contact local authorities if you feel threatened.</li>
              <li>
                Report the incident to DevShaadi through our 24/7 safety
                hotline.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
