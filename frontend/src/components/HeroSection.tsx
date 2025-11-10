"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaHeart,
  FaUsers,
  FaStar,
  FaCommentDots,
  FaGlobe,
} from "react-icons/fa";

export default function HeroSection() {
  const stats = [
    {
      number: "1000+",
      label: "Tech Professionals",
      icon: <FaUsers className="w-5 h-5" />,
    },
    {
      number: "50+",
      label: "Success Stories",
      icon: <FaStar className="w-5 h-5" />,
    },
    {
      number: "98%",
      label: "Response Rate",
      icon: <FaCommentDots className="w-5 h-5" />,
    },
    {
      number: "20+",
      label: "Countries",
      icon: <FaGlobe className="w-5 h-5" />,
    },
  ];

  return (
    <section className="relative text-white">
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[640px]">
        <Image
          src="/images/lat2.jpeg"
          alt="Hero Image"
          fill
          className="object-cover object-[10%_0%]"
          priority
          quality={100}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-3 flex items-center justify-center gap-3 text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.6)]">
            Find Your Perfect Tech Match{" "}
            <FaHeart className="text-red-500 animate-pulse" />
          </h1>
          <p className="text-lg sm:text-xl mb-6 max-w-xl text-white drop-shadow-lg">
            The #1 matrimony platform exclusively for developers, engineers, and
            tech professionals.
          </p>
          <Link
            href="/create-profile"
            className="bg-purple-700 hover:bg-purple-800 text-white px-12 sm:px-16 py-3 rounded-lg font-semibold text-lg sm:text-xl shadow-lg transition transform hover:scale-105"
          >
            Find Your Match
          </Link>
        </div>

        {/*  Stats Strip */}
        <div className="absolute bottom-0 left-0 w-full bg-black/70 py-3 px-4 flex flex-wrap justify-around items-center gap-4 rounded-t-xl">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center text-white cursor-pointer flex-1 min-w-[70px] sm:min-w-[90px] opacity-0 animate-fade-up"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex items-center gap-1 mb-1 text-white">
                {item.icon}
                <span className="font-semibold text-lg sm:text-xl">
                  {item.number}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*  Heading & Stats Animation */}
      <style jsx>{`
        h1 {
          background: linear-gradient(90deg, #ffffff, #fffbcc, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 2s infinite;
        }
        @keyframes shine {
          0% {
            background-position: -200px;
          }
          100% {
            background-position: 200px;
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}
