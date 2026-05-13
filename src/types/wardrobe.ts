export type ClothingCategory =
  | "top"
  | "bottom"
  | "dress"
  | "outerwear"
  | "footwear"
  | "accessory";

export type EventType =
  | "wedding"
  | "birthday_party"
  | "office"
  | "casual_meetup"
  | "concert"
  | "date_night"
  | "festive"
  | "graduation"
  | "sports";

export interface ClothingItem {
  id: string;
  imageUrl: string;       // base64 or object URL
  imageMimeType: string;
  category: ClothingCategory;
  color: string;
  description: string;
  tags: string[];
}

export interface OutfitSuggestion {
  title: string;
  items: string[];         // references to ClothingItem descriptions
  stylingTips: string;
  accessorySuggestions: string;
  whyItWorks: string;
}

export interface WardrobeState {
  clothes: ClothingItem[];
  selectedEvent: EventType | null;
  suggestion: OutfitSuggestion | null;
  isAnalyzing: boolean;
  isSuggesting: boolean;
  error: string | null;
}
