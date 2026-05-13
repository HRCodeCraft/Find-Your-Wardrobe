"use client";

import Image from "next/image";
import { ClothingItem } from "@/types/wardrobe";

interface Props {
  item: ClothingItem;
  onRemove: (id: string) => void;
}

const categoryEmoji: Record<string, string> = {
  top: "👕",
  bottom: "👖",
  dress: "👗",
  outerwear: "🧥",
  footwear: "👟",
  accessory: "💍",
};

export default function ClothingCard({ item, onRemove }: Props) {
  return (
    <div className="relative group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative w-full h-40">
        <Image
          src={item.imageUrl}
          alt={item.description}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-2 left-2 text-xl">
          {categoryEmoji[item.category] ?? "👔"}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          ✕
        </button>
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-gray-700 capitalize">{item.category}</p>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
