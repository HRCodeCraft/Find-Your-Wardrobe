import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { ClothingItem, EventType } from "@/types/wardrobe";

const client = new Anthropic();

const eventLabels: Record<EventType, string> = {
  wedding:        "Wedding / Shaadi",
  birthday_party: "Birthday Party",
  office:         "Office / Work",
  casual_meetup:  "Casual Meetup with friends",
  concert:        "Concert / Live show",
  date_night:     "Date Night",
  festive:        "Festive occasion (Diwali/Eid/Holi)",
  graduation:     "Graduation / Convocation",
  sports:         "Sports / Gym / Outdoor",
};

export async function POST(req: NextRequest) {
  try {
    const { clothes, event }: { clothes: ClothingItem[]; event: EventType } = await req.json();

    if (!clothes?.length || !event) {
      return NextResponse.json({ error: "Clothes and event required" }, { status: 400 });
    }

    const wardrobeList = clothes
      .map((c, i) => `${i + 1}. ${c.category} — ${c.color} — "${c.description}" [tags: ${c.tags.join(", ")}]`)
      .join("\n");

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: `You are a personal fashion stylist specializing in Indian and global fashion.
You help people create stylish outfits from their existing wardrobe.
Always be encouraging — the goal is to make them feel confident with what they already own.
Reply in Hinglish (mix of Hindi and English) to feel friendly and relatable.`,
      messages: [
        {
          role: "user",
          content: `Meri wardrobe mein ye cheezein hain:

${wardrobeList}

Event: ${eventLabels[event]}

Kripya ONLY valid JSON return karo (no markdown fences):
{
  "title": "outfit ka catchy naam",
  "items": ["item 1 description", "item 2 description"],
  "stylingTips": "2-3 styling tips in Hinglish",
  "accessorySuggestions": "accessories ke baare mein suggestions (even if not in wardrobe, suggest common ones to pair)",
  "whyItWorks": "1-2 lines mein kyun ye outfit is event ke liye perfect hai"
}`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return NextResponse.json({ error: "Could not parse suggestion" }, { status: 500 });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("suggest-outfit error:", err);
    return NextResponse.json({ error: "Suggestion failed" }, { status: 500 });
  }
}
