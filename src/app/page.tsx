"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UploadZone from "@/components/UploadZone";
import ClothingCard from "@/components/ClothingCard";
import EventSelector from "@/components/EventSelector";
import OutfitResult from "@/components/OutfitResult";
import { ClothingItem, EventType, OutfitSuggestion } from "@/types/wardrobe";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
  });
}

export default function Home() {
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [suggestion, setSuggestion] = useState<OutfitSuggestion | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFilesSelected(files: File[]) {
    setIsAnalyzing(true);
    setError(null);

    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const base64 = await fileToBase64(file);
          const imageUrl = URL.createObjectURL(file);

          const res = await fetch("/api/analyze-clothing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
          });

          if (!res.ok) throw new Error("Analysis failed");
          const data = await res.json();

          const item: ClothingItem = {
            id: uuidv4(),
            imageUrl,
            imageMimeType: file.type,
            category: data.category ?? "top",
            color: data.color ?? "unknown",
            description: data.description ?? file.name,
            tags: data.tags ?? [],
          };
          return item;
        })
      );

      setClothes((prev) => [...prev, ...results]);
    } catch {
      setError("Kuch kapde analyze nahi ho sake. Please retry karo.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function handleGetOutfit() {
    if (!selectedEvent || clothes.length === 0) return;
    setIsSuggesting(true);
    setError(null);
    setSuggestion(null);

    try {
      const res = await fetch("/api/suggest-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clothes, event: selectedEvent }),
      });

      if (!res.ok) throw new Error("Suggestion failed");
      const data = await res.json();
      setSuggestion(data);
    } catch {
      setError("Outfit suggestion nahi aa saka. Please retry karo.");
    } finally {
      setIsSuggesting(false);
    }
  }

  function removeClothingItem(id: string) {
    setClothes((prev) => prev.filter((c) => c.id !== id));
    setSuggestion(null);
  }

  function handleReset() {
    setSuggestion(null);
    setSelectedEvent(null);
  }

  const canSuggest = clothes.length > 0 && selectedEvent !== null && !isSuggesting;

  return (
    <main className="min-h-screen gradient-bg">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👗</span>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-none">Find Your Wardrobe</h1>
            <p className="text-xs text-gray-400">AI-Powered Outfit Stylist</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
            {clothes.length} kapde
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center py-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-balance">
            Koi naya kapda nahi,{" "}
            <span className="text-orange-500">naya look zaroor!</span>
          </h2>
          <p className="text-gray-500 mt-3 text-base max-w-lg mx-auto">
            Apne existing wardrobe ki photos upload karo, event choose karo — AI tumhara
            perfect outfit suggest karega
          </p>
        </div>

        {/* Step 1: Upload */}
        <section className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-sm border border-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 bg-orange-500 text-white rounded-full text-sm font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="font-semibold text-gray-800">Apne kapde upload karo</h2>
          </div>
          <UploadZone onFilesSelected={handleFilesSelected} isAnalyzing={isAnalyzing} />
        </section>

        {/* Wardrobe Grid */}
        {clothes.length > 0 && (
          <section className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-sm border border-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">
                Teri Wardrobe ({clothes.length} items)
              </h2>
              <button
                onClick={() => {
                  setClothes([]);
                  setSuggestion(null);
                }}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Sab hatao
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {clothes.map((item) => (
                <ClothingCard key={item.id} item={item} onRemove={removeClothingItem} />
              ))}
            </div>
          </section>
        )}

        {/* Step 2: Event Selector */}
        {clothes.length > 0 && (
          <section className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-sm border border-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 bg-orange-500 text-white rounded-full text-sm font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="font-semibold text-gray-800">Event choose karo</h2>
            </div>
            <EventSelector selected={selectedEvent} onSelect={setSelectedEvent} />
          </section>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Step 3: Get Suggestion CTA */}
        {clothes.length > 0 && selectedEvent && !suggestion && (
          <section className="text-center">
            <button
              onClick={handleGetOutfit}
              disabled={!canSuggest}
              className={`
                px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all duration-200
                ${
                  canSuggest
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 hover:scale-105 active:scale-95"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              {isSuggesting ? (
                <span className="flex items-center gap-3">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  AI soch raha hai...
                </span>
              ) : (
                "✨ Mera Outfit Suggest Karo!"
              )}
            </button>
          </section>
        )}

        {/* Result */}
        {suggestion && <OutfitResult suggestion={suggestion} onReset={handleReset} />}

        {/* Empty state */}
        {clothes.length === 0 && !isAnalyzing && (
          <div className="text-center py-4 text-gray-400 text-sm">
            Pehle kuch kapde upload karo upar se ⬆️
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400">
        Powered by Claude AI — Find Your Wardrobe
      </footer>
    </main>
  );
}
