import { NextResponse } from "next/server";
import { collections } from "@/lib/mongodb";

const ALLOWED_TAGS = new Set(["All", "Classroom", "Patriotic", "Cultural", "Event"]);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag") || "All";

    const col = await collections.galleryItems();
    const filter: any = { isPublic: true };
    if (ALLOWED_TAGS.has(tag) && tag !== "All") {
      filter.tag = tag;
    }

    const items = await col.find(filter).sort({ createdAt: -1 }).limit(100).toArray();
    return NextResponse.json({ items: items.map(it => ({
      id: String(it._id),
      title: it.title,
      imageUrl: it.imageUrl,
      thumbnailUrl: it.thumbnailUrl || null,
      type: it.type,
      tag: it.tag,
      date: it.date || null,
    })) });
  } catch (err: any) {
    console.error("[gallery] Error:", err);
    return NextResponse.json({ items: [] });
  }
}
