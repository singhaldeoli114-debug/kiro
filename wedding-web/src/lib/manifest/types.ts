/**
 * Wedding Manifest schema.
 *
 * Every guest-facing string, asset and rule is read from a versioned manifest
 * so that a new wedding requires no runtime code changes (spec §64
 * "Personalization" acceptance criteria).
 */

/** Publishing gate for each important content block (spec §57). */
export type ContentStatus =
  | "missing"
  | "draft"
  | "awaiting-approval"
  | "approved"
  | "published"
  | "superseded";

/** Only approved or published content may be rendered to a guest. */
export const PUBLISHABLE: ContentStatus[] = ["approved", "published"];

/** Which routes exist for this wedding (spec §2.1, §3.2). */
export type PageKey =
  | "events"
  | "travel"
  | "gallery"
  | "rsvp"
  | "blessings"
  | "registry"
  | "upload"
  | "fun"
  | "guest"
  | "contact";

/**
 * `enabled`  — the page exists and may be linked.
 * `planned`  — the page is part of the roadmap but does not exist yet, so it
 *              must not appear in links, menus or search (spec §2.1).
 * `disabled` — the feature is switched off for this wedding.
 */
export type PageState = "enabled" | "planned" | "disabled";

/** Named vector art recipes used until approved bitmap artwork is delivered. */
export type ArtworkKey =
  | "palace-arch"
  | "couple-portrait"
  | "courtyard"
  | "garden-pavilion"
  | "stage"
  | "mandap"
  | "terrace-night"
  | "lake-city"
  | "family-crest";

export interface ImageAsset {
  id: string;
  /** Approved responsive bitmap. When absent the `artwork` recipe is drawn. */
  src?: string;
  width?: number;
  height?: number;
  /** Empty string marks the image as decorative (spec §61). */
  alt: string;
  artwork: ArtworkKey;
  status: ContentStatus;
}

export interface AudioAsset {
  id: string;
  src?: string;
  /** Visible equivalent text is mandatory for every voice asset (spec §61). */
  transcript: string;
  status: ContentStatus;
}

export interface LocalisedDateTime {
  /** ISO 8601 with offset. */
  start: string;
  end?: string;
  /** IANA timezone, used for every calendar entry (spec §21). */
  timezone: string;
}

export interface Venue {
  id: string;
  name: string;
  addressLines: string[];
  city: string;
  mapsQuery: string;
  /** Rough travel time from the recommended hotel cluster. */
  travelNote?: string;
}

export interface DressCode {
  name: string;
  description: string;
  palette: string[];
}

export type EventSlug =
  | "engagement"
  | "haldi"
  | "mehndi"
  | "sangeet"
  | "wedding"
  | "reception"
  | (string & {});

export type EventState = "scheduled" | "changed" | "cancelled";

export interface WeddingEvent {
  slug: EventSlug;
  name: string;
  /** One-line meaning of the ceremony, shown on the timeline card. */
  meaning: string;
  /** Rule name the guest record must grant in order to see this event. */
  guestVisibilityRule: string;
  dateTime: LocalisedDateTime;
  venueId: string;
  /** True when the event shares the wedding's main venue (spec §26). */
  inheritMainVenue: boolean;
  dressCode: DressCode;
  accent: string;
  glyph: EventGlyph;
  hero: ImageAsset;
  state: EventState;
  stateNote?: string;
  rsvp: { enabled: boolean; deadline: string };
  status: ContentStatus;
}

export type EventGlyph =
  | "ring"
  | "turmeric"
  | "henna"
  | "music"
  | "fire"
  | "lights";

export interface StoryMilestone {
  id: string;
  label: string;
  /** Short display date, e.g. "March 2022". */
  when: string;
  copy: string;
  image: ImageAsset;
  status: ContentStatus;
}

export interface Family {
  id: string;
  /** e.g. "Aarav's Family" */
  side: string;
  /** e.g. "The Malhotras" */
  name: string;
  hosts: string[];
  hostDesignation?: string;
  welcomeMessage: string;
  remembrance?: string;
  image: ImageAsset;
  status: ContentStatus;
}

export interface HotelSummary {
  id: string;
  name: string;
  area: string;
  note: string;
}

export interface TravelSummary {
  destination: string;
  arrivalRecommendation: string;
  departureRecommendation: string;
  airport: string;
  railway: string;
  pickupAvailable: boolean;
  pickupNote: string;
  hotels: HotelSummary[];
  image: ImageAsset;
  status: ContentStatus;
}

export interface GalleryPreview {
  /** Preview shows four to six approved images (spec §13). */
  images: ImageAsset[];
  highlightReel?: { id: string; src?: string; poster: ImageAsset; seconds: number; status: ContentStatus };
  caption: string;
  status: ContentStatus;
}

export interface FoodInfo {
  assurance: string;
  vegetarian: boolean;
  jain: boolean;
  vegan: boolean;
  allergyStatement: string;
  /** Menus are only shown once approved (spec §14). */
  menusPublished: boolean;
  status: ContentStatus;
}

export interface RsvpConfig {
  enabled: boolean;
  deadline: string;
  helpText: string;
  /**
   * Shown while the RSVP page itself is not published yet, so the section still
   * gives the guest a real way to respond instead of a dead button.
   */
  interimNote?: string;
  status: ContentStatus;
}

export interface Blessing {
  id: string;
  from: string;
  relation?: string;
  message: string;
  format: "text" | "voice" | "photo" | "video";
  moderation: "submitted" | "processing" | "review" | "approved" | "published" | "rejected";
}

export interface BlessingsPreview {
  intro: string;
  messages: Blessing[];
  acceptedFormats: Array<Blessing["format"]>;
  /** Used while the blessing wall page is not published. */
  interimNote?: string;
  status: ContentStatus;
}

export interface Faq {
  question: string;
  answer: string;
  status: ContentStatus;
}

export interface Coordinator {
  id: string;
  role: string;
  name: string;
  /** Only guest-approved contact details are ever included. */
  phone?: string;
  whatsapp?: string;
  email?: string;
  hours?: string;
  status: ContentStatus;
}

export interface Closing {
  thankYou: string;
  signature: string;
  hashtag: string;
  image: ImageAsset;
  voice?: AudioAsset;
  status: ContentStatus;
}

export interface Couple {
  /** Display order is deliberate and configurable. */
  partnerOne: { firstName: string; lastName: string; formOfAddress?: string };
  partnerTwo: { firstName: string; lastName: string; formOfAddress?: string };
  monogram: string;
  introduction: string;
  quote?: string;
  portrait: ImageAsset;
  voice?: AudioAsset;
}

export interface WeddingIdentity {
  dateRange: LocalisedDateTime;
  city: string;
  region: string;
  country: string;
  invitationMessage: string;
  /** Wording chosen by the hosts, e.g. couple-led or parent-led. */
  invitationWording: string;
  hashtag: string;
  mainVenueId: string;
}

export interface ExperienceConfig {
  mode: "2.5d-cinematic";
  runtime3d: false;
  quickDetails: boolean;
  /** Published languages. A language control appears only when >1. */
  languages: Array<{ code: string; label: string; status: ContentStatus }>;
  ambientAudio?: AudioAsset;
}

export interface WeddingManifest {
  slug: string;
  version: string;
  experience: ExperienceConfig;
  pages: Record<PageKey, PageState>;
  couple: Couple;
  wedding: WeddingIdentity;
  venues: Venue[];
  events: WeddingEvent[];
  story: StoryMilestone[];
  families: Family[];
  travel: TravelSummary;
  gallery: GalleryPreview;
  food: FoodInfo;
  rsvp: RsvpConfig;
  blessings: BlessingsPreview;
  coordinators: Coordinator[];
  faqs: Faq[];
  closing: Closing;
  hero: ImageAsset;
  privacyNotice: string;
}
