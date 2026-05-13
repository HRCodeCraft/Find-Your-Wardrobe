import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64 || !mimeType) {
      return NextResponse.json({ error: "Image data required" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: `Analyze this clothing item and return ONLY a valid JSON object (no markdown, no explanation):
{
  "category": "top|bottom|dress|outerwear|footwear|accessory",
  "color": "primary color name",
  "description": "brief 1-line description in English",
  "tags": ["tag1", "tag2", "tag3"]
}

Tags should describe: style (casual/formal/ethnic/western), fabric if visible, occasion suitability, pattern.`,
            },
          ],
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Could not parse AI response" }, { status: 500 });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("analyze-clothing error:", err);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
