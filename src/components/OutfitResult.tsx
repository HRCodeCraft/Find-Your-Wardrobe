"use client";

import { OutfitSuggestion } from "@/types/wardrobe";

interface Props {
  suggestion: OutfitSuggestion;
  onReset: () => void;
}

export default function OutfitResult({ suggestion, onReset }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-6 text-white">
        <p className="text-sm font-medium opacity-80 mb-1">AI Stylist ka suggestion</p>
        <h2 className="text-2xl font-bold">{suggestion.title}</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Selected Items */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Outfit Items
          </h3>
          <ul className="space-y-2">
            {suggestion.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Styling Tips */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Styling Tips
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed bg-orange-50 rounded-xl p-4">
            {suggestion.stylingTips}
          </p>
        </div>

        {/* Accessories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Accessories Pairing
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed bg-pink-50 rounded-xl p-4">
            {suggestion.accessorySuggestions}
          </p>
        </div>

        {/* Why it works */}
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-100">
          <h3 className="text-sm font-semibold text-orange-600 mb-1">Kyun perfect hai ye outfit?</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{suggestion.whyItWorks}</p>
        </div>

        <button
          onClick={onReset}
          className="w-full py-3 rounded-xl border-2 border-orange-300 text-orange-600 font-semibold hover:bg-orange-50 transition-colors text-sm"
        >
          Dobara Try Karo — Different Event
        </button>
      </div>
    </div>
  );
}
