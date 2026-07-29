import { WeddingExperience } from "@/components/WeddingExperience";
import { weddingManifest } from "@/lib/wedding-manifest";

export default function Home() {
  return <WeddingExperience manifest={weddingManifest} />;
}
