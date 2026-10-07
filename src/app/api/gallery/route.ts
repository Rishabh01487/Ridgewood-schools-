import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * /api/gallery?tag=Classroom
 *   GET — returns public gallery items, optionally filtered by tag
 *
 * Security:
 * - Only returns isPublic=true items (private items are parent-portal only)
 * - Tag is whitelisted; unknown tags fall back to "All"
 * - Limited to 100 results to prevent scraping
 * - No auth required — this is the public gallery
 */

const ALLOWED_TAGS = new Set(["All", "Classroom", "Patriotic", "Cultural", "Event"]);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag") || "All";

  const where = !ALLOWED_TAGS.has(tag)
    ? { isPublic: true }
    : tag === "All"
    ? { isPublic: true }
    : { isPublic: true, tag };

  const items = await db.galleryItem.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({
    items: items.map((it) => ({
      id: it.id,
      title: it.title,
      imageUrl: it.imageUrl,
      thumbnailUrl: it.thumbnailUrl,
      type: it.type,
      tag: it.tag,
      date: it.date,
    })),
  });
}
