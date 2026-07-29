export type QualityTier = "enhanced" | "standard" | "lite";
export type MotionPreset = "slow-drift" | "rise" | "character-reveal" | "foreground-parallax";

export interface SceneLayer {
  id: string;
  src: string;
  depth: number;
  motion: MotionPreset;
}

export interface WeddingScene {
  id: string;
  chapter: string;
  eyebrow: string;
  title: string;
  copy: string;
  date?: string;
  time?: string;
  venue?: string;
  attire?: string;
  actionLabel: string;
  palette: "sunset" | "romance" | "haldi" | "sangeet" | "wedding";
  layers: SceneLayer[];
}

export interface WeddingManifest {
  version: string;
  experience: { mode: "2.5d-cinematic"; runtime3d: false; quickDetails: true; reducedMotion: true };
  guest: { displayName: string };
  couple: { partnerOne: string; partnerTwo: string; monogram: string };
  wedding: { date: string; dateISO: string; city: string; venue: string; rsvpBy: string };
  quality: { default: QualityTier; tiers: QualityTier[] };
  voice: { enabled: boolean; language: string; transcript: string };
  scenes: WeddingScene[];
}

export const weddingManifest: WeddingManifest = {
  version: "2026.07.29-mvp.1",
  experience: { mode: "2.5d-cinematic", runtime3d: false, quickDetails: true, reducedMotion: true },
  guest: { displayName: "The Sharma Family" },
  couple: { partnerOne: "Aarav", partnerTwo: "Meera", monogram: "A&M" },
  wedding: { date: "21 November 2026", dateISO: "2026-11-21T17:45:00+05:30", city: "Jaipur", venue: "Rajmahal Palace", rsvpBy: "15 September 2026" },
  quality: { default: "enhanced", tiers: ["enhanced", "standard", "lite"] },
  voice: { enabled: true, language: "English", transcript: "Together with their families, Aarav and Meera invite you to celebrate their forever in Jaipur." },
  scenes: [
    {
      id: "palace", chapter: "Welcome", eyebrow: "The palace gates open", title: "A royal celebration awaits", copy: "Enter a world of sandstone, sunset, and three unforgettable days in Jaipur.", actionLabel: "Meet the couple", palette: "sunset",
      layers: [
        { id: "palace-sky", src: "scenes/palace-sky.svg", depth: 0.12, motion: "slow-drift" },
        { id: "palace-mid", src: "scenes/palace-mid.svg", depth: 0.48, motion: "rise" },
        { id: "palace-front", src: "scenes/palace-front.svg", depth: 0.9, motion: "foreground-parallax" }
      ]
    },
    {
      id: "couple", chapter: "Our story", eyebrow: "Two paths · One forever", title: "Aarav & Meera", copy: "Five years, twelve cities, and countless cups of chai led us to this moment.", actionLabel: "Follow the sunshine", palette: "romance",
      layers: [
        { id: "couple-sky", src: "scenes/couple-sky.svg", depth: 0.1, motion: "slow-drift" },
        { id: "couple-mid", src: "scenes/couple-mid.svg", depth: 0.42, motion: "rise" },
        { id: "couple-characters", src: "scenes/couple-characters.svg", depth: 0.7, motion: "character-reveal" },
        { id: "couple-front", src: "scenes/couple-front.svg", depth: 0.92, motion: "foreground-parallax" }
      ]
    },
    {
      id: "haldi", chapter: "Celebration 01", eyebrow: "Friday · 10:30 AM", title: "Haldi in the sun", copy: "A courtyard of marigolds, laughter, and a little golden mischief.", date: "20 November", time: "10:30 AM", venue: "Surya Courtyard", attire: "Sunshine hues", actionLabel: "Dance beneath the stars", palette: "haldi",
      layers: [
        { id: "haldi-sky", src: "scenes/haldi-sky.svg", depth: 0.1, motion: "slow-drift" },
        { id: "haldi-mid", src: "scenes/haldi-mid.svg", depth: 0.52, motion: "rise" },
        { id: "haldi-front", src: "scenes/haldi-front.svg", depth: 0.92, motion: "foreground-parallax" }
      ]
    },
    {
      id: "sangeet", chapter: "Celebration 02", eyebrow: "Friday · 7:30 PM", title: "Sangeet under stars", copy: "Music fills the palace as two families become one on the dance floor.", date: "20 November", time: "7:30 PM", venue: "Sheesh Mahal Lawns", attire: "Jewel tones", actionLabel: "Witness the vows", palette: "sangeet",
      layers: [
        { id: "sangeet-sky", src: "scenes/sangeet-sky.svg", depth: 0.1, motion: "slow-drift" },
        { id: "sangeet-mid", src: "scenes/sangeet-mid.svg", depth: 0.52, motion: "rise" },
        { id: "sangeet-front", src: "scenes/sangeet-front.svg", depth: 0.92, motion: "foreground-parallax" }
      ]
    },
    {
      id: "wedding", chapter: "Celebration 03", eyebrow: "Saturday · Pheras at sunset", title: "Seven sacred promises", copy: "Beneath the royal mandap, two souls begin one beautiful forever.", date: "21 November", time: "Baraat 3:30 PM · Pheras 5:45 PM", venue: "Rajmahal Palace", attire: "Royal Indian formal", actionLabel: "Respond to our invitation", palette: "wedding",
      layers: [
        { id: "wedding-sky", src: "scenes/wedding-sky.svg", depth: 0.1, motion: "slow-drift" },
        { id: "wedding-mid", src: "scenes/wedding-mid.svg", depth: 0.52, motion: "rise" },
        { id: "wedding-front", src: "scenes/wedding-front.svg", depth: 0.94, motion: "foreground-parallax" }
      ]
    }
  ]
};
