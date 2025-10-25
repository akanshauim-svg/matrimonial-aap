"use client";

import { Mail, Phone, MapPin } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { supabase } from '../../lib/supabaseClient'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
     
     
      <div className="bg-linear-to-r from-pink-500 to-purple-500 text-white text-center py-12">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-sm md:text-base">
          Have questions or feedback? We&apos;d love to hear from you.
        </p>
      </div>

      
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mt-10">
       
       
        <div className="border rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
          <Mail className="w-10 h-10 text-pink-500 mb-3" />
          <h3 className="font-semibold text-lg">Email Us</h3>
          <p className="text-sm text-gray-600 mt-1">support@devshaadi.com</p>
          <p className="text-xs text-gray-400 mt-1">We’ll respond within 24 hours</p>
        </div>

            
        <div className="border rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
          <Phone className="w-10 h-10 text-pink-500 mb-3" />
          <h3 className="font-semibold text-lg">Call Us</h3>
          <p className="text-sm text-gray-600 mt-1">0120-5150892</p>
          <p className="text-xs text-gray-400 mt-1">Mon–Fri, 9am–6pm (IST & EST)</p>
        </div>

       
        <div className="border rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
          <MapPin className="w-10 h-10 text-pink-500 mb-3" />
          <h3 className="font-semibold text-lg">Visit Us</h3>
          <p className="text-sm text-gray-600 mt-1">
            O 1234, Floor 12, Gaur City Centre,
               Gaur Chowk, West, Sector 4,
            Greater Noida, UP – 203207 <br /> India
          </p>
        </div>
      </div>

      
      <div className="max-w-3xl mx-auto mt-12 mb-20 px-6">
        <div className="border rounded-xl p-8 shadow-sm">
          <h2 className="font-semibold text-lg mb-6">Send Us a Message</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <select className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option>Select a topic</option>
              <option>General Inquiry</option>
              <option>Support</option>
              <option>Feedback</option>
            </select>

            <textarea
              rows={5}
              placeholder="Your Message"
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>

            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md w-full md:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
