"use client";

import { useRouter } from "next/navigation";
import { Calendar, MapPin, Heart } from "lucide-react";

interface BrowseCard {
  title: string;
  queryParam: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const cards: BrowseCard[] = [
  { title: "Age-Range", queryParam: "age", Icon: Calendar, color: "#f97316" },
  { title: "Location", queryParam: "location", Icon: MapPin, color: "#3b82f6" },
  { title: "Interest", queryParam: "interest", Icon: Heart, color: "#ef4444" },
];

export default function BrowseProfileSection() {
  const router = useRouter();

  const handleClick = (param: string) => {
    router.push(`/browse-profile?filter=${param}`);
  };

  return (
    <section className="px-4 md:px-8 py-10 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Browse Profiles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="cursor-pointer rounded-xl bg-white p-6 text-center flex flex-col items-center gap-3 shadow-md transition transform hover:scale-105 hover:shadow-lg"
            onClick={() => handleClick(card.queryParam)}
          >
            <card.Icon
              className="w-10 h-10"
              style={{ color: card.color }}
            />
            <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
