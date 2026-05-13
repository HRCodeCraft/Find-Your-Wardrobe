"use client";

import { EventType } from "@/types/wardrobe";

interface Props {
  selected: EventType | null;
  onSelect: (event: EventType) => void;
}

const events: { type: EventType; label: string; emoji: string; desc: string }[] = [
  { type: "wedding",        label: "Wedding",        emoji: "💍", desc: "Shaadi / Nikah" },
  { type: "birthday_party", label: "Birthday Party", emoji: "🎂", desc: "Party time!" },
  { type: "office",         label: "Office",         emoji: "💼", desc: "Professional look" },
  { type: "casual_meetup",  label: "Casual Meetup",  emoji: "☕", desc: "Friends gathering" },
  { type: "concert",        label: "Concert",        emoji: "🎵", desc: "Music / Show" },
  { type: "date_night",     label: "Date Night",     emoji: "🌙", desc: "Romantic evening" },
  { type: "festive",        label: "Festive",        emoji: "🪔", desc: "Diwali / Eid / Holi" },
  { type: "graduation",     label: "Graduation",     emoji: "🎓", desc: "Convocation day" },
  { type: "sports",         label: "Sports / Gym",   emoji: "🏃", desc: "Active & sporty" },
];

export default function EventSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Kaunse event pe jaana hai?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {events.map((ev) => (
          <button
            key={ev.type}
            onClick={() => onSelect(ev.type)}
            className={`
              flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all duration-200 text-center
              ${selected === ev.type
                ? "border-orange-400 bg-orange-50 shadow-md scale-[1.02]"
                : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
              }
            `}
          >
            <span className="text-3xl">{ev.emoji}</span>
            <span className="font-semibold text-gray-800 text-sm">{ev.label}</span>
            <span className="text-gray-400 text-xs">{ev.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
