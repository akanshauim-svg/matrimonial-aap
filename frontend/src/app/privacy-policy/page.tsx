"use client";

import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      
      <div className="w-full bg-linear-to-r from-purple-500 to-pink-400 py-20 text-center shadow-md">
        <div className="px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">Privacy Policy</h1>
          <p className="text-sm sm:text-base text-white">Last updated: Oct 22, 2025</p>
        </div>
      </div>

      
      <div className="flex justify-center w-full mt-8 px-4 sm:px-6">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-10 max-w-4xl w-full">
          
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            DevShaadi (&#39;we,&#39; &#39;us,&#39; or &#39;our&#39;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard 
            your information when you use our website and services.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-black">Information We Collect</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            We collect personal information that you provide directly to us, such as your 
            name, email address, date of birth, gender, location, occupation, educational 
            background, profile photos, and other information you choose to provide in your 
            profile. We also collect information about your use of our services, including 
            log data, device information, and location data.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-black">How We Use Your Information</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, 
            to develop new features, and to protect DevShaadi and our users. We also use your 
            information to communicate with you about our services, respond to your inquiries, 
            and provide customer support.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-black">Information Sharing and Disclosure</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            We do not sell, trade, or rent your personal information to third parties.
            We may share your information with third-party service providers who perform services
            on our behalf, such as hosting, data analysis, and customer service.
            We may also share your information when required by law, to protect our rights,
            or in connection with a business transfer.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-black">Your Choices and Rights</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            You can access and update certain information in your account settings.
            You can also request a copy of your personal information,
            request that we correct inaccurate information, request that we delete your
            information, or object to our processing of your information.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-black">Data Security</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            We take reasonable measures to protect your personal information from unauthorized 
            access, use, or disclosure. However, no method of transmission over the Internet or electronic
            storage is 100% secure, so we cannot guarantee absolute security.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-black">Children&#39;s Privacy</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            Our services are not directed to children under the age of 18,
            and we do not knowingly collect personal information from children under 18.
            If we become aware that we have collected personal information from a child under 18, 
            we will take steps to delete such information.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-black">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            We may update this Privacy Policy from time to time. If we make material changes,
            we will notify you by email or through a notice on our website
            prior to the changes becoming effective.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-black">Contact Us</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            If you have any questions about this Privacy Policy, 
            please contact us at privacy@devshaadi.com or through our Contact page.
            <br /><br />
            By using DevShaadi, you agree to the collection and use of information in accordance with this Privacy Policy.
            If you do not agree with our policies and practices, please do not use our services.
          </p>

          
          <div className="flex justify-center mt-8">
            <Link
              href="/"
              className="px-6 py-3 sm:px-8 sm:py-3 bg-pink-500 text-white text-sm sm:text-base rounded-full shadow hover:bg-pink-600 transition duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
