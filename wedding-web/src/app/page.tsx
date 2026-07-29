import { redirect } from "next/navigation";
import { DEFAULT_WEDDING_SLUG } from "@/lib/manifest";

/**
 * The site root is not a page of its own. Every wedding lives at its own real
 * URL (spec §2.1), so the root simply forwards to the wedding being served.
 */
export default function RootPage() {
  redirect(`/w/${DEFAULT_WEDDING_SLUG}`);
}
