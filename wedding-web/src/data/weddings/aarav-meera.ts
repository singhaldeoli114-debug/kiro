import type { WeddingManifest } from "@/lib/manifest/types";

const TZ = "Asia/Kolkata";

/**
 * Reference manifest. Everything a guest reads on the main page comes from
 * here, which is what allows a new wedding to ship without code changes.
 *
 * Only the main Wedding Journey is built in this phase, so every dedicated
 * route is marked `planned`. The navigation resolver therefore points menu and
 * section links at main-page anchors instead of producing dead URLs.
 */
export const aaravMeera: WeddingManifest = {
  slug: "aarav-meera",
  version: "2026.07.29-1",

  experience: {
    mode: "2.5d-cinematic",
    runtime3d: false,
    quickDetails: true,
    languages: [
      { code: "en", label: "English", status: "published" },
      // Hindi copy is written but not yet reviewed, so no language control is
      // rendered (spec §57: unapproved content cannot be published).
      { code: "hi", label: "हिन्दी", status: "draft" },
    ],
    // No approved ambient track yet — the sound control stays hidden rather
    // than offering a button that cannot play anything.
    ambientAudio: {
      id: "audio_ambient_shehnai",
      transcript: "Instrumental shehnai and sitar welcome music.",
      status: "draft",
    },
  },

  pages: {
    events: "planned",
    travel: "planned",
    gallery: "planned",
    rsvp: "planned",
    blessings: "planned",
    registry: "disabled",
    upload: "planned",
    fun: "planned",
    guest: "planned",
    contact: "planned",
  },

  couple: {
    partnerOne: { firstName: "Aarav", lastName: "Malhotra" },
    partnerTwo: { firstName: "Meera", lastName: "Sharma" },
    monogram: "A&M",
    introduction:
      "Aarav is an architect who sketches every city he visits. Meera is a classical dancer who turns every room into a stage. They met over a shared plate of kachoris outside a bookshop in Jaipur, and have been arguing about the best one in India ever since.",
    quote: "We found each other in the middle of an ordinary week, and nothing has been ordinary since.",
    portrait: {
      id: "asset_couple_portrait",
      alt: "Aarav and Meera standing together beneath a floral arch",
      artwork: "couple-portrait",
      status: "approved",
    },
    voice: {
      id: "audio_couple_welcome",
      transcript:
        "We are so happy to celebrate this new chapter with you. Thank you for travelling to Udaipur to stand beside us.",
      status: "draft",
    },
  },

  wedding: {
    dateRange: {
      start: "2027-02-11T19:00:00+05:30",
      end: "2027-02-14T23:30:00+05:30",
      timezone: TZ,
    },
    city: "Udaipur",
    region: "Rajasthan",
    country: "India",
    invitationMessage:
      "Four days beside the lake, with the people who made us who we are. We would be honoured to have you with us.",
    invitationWording:
      "Mr and Mrs Rajeev Malhotra, together with Mr and Mrs Vinod Sharma, request the pleasure of your company.",
    hashtag: "#AaravFoundHisMeera",
    mainVenueId: "venue_lake_palace",
  },

  venues: [
    {
      id: "venue_lake_palace",
      name: "Jal Mahal Palace Grounds",
      addressLines: ["Lake Pichola East Bank"],
      city: "Udaipur, Rajasthan 313001",
      mapsQuery: "Jal Mahal Palace Grounds, Lake Pichola, Udaipur, Rajasthan",
      travelNote: "12 minutes from the guest hotels by shuttle",
    },
    {
      id: "venue_lake_terrace",
      name: "Chandni Terrace, Jal Mahal",
      addressLines: ["Jal Mahal Palace Grounds, Lake Pichola East Bank"],
      city: "Udaipur, Rajasthan 313001",
      mapsQuery: "Jal Mahal Palace Grounds, Lake Pichola, Udaipur, Rajasthan",
      travelNote: "Same grounds as the wedding, enter through Gate 2",
    },
    {
      id: "venue_haveli_courtyard",
      name: "Amrit Haveli Courtyard",
      addressLines: ["Gangaur Ghat Road"],
      city: "Udaipur, Rajasthan 313001",
      mapsQuery: "Gangaur Ghat Road, Udaipur, Rajasthan",
      travelNote: "8 minutes from the guest hotels",
    },
    {
      id: "venue_garden_pavilion",
      name: "Saheli Garden Pavilion",
      addressLines: ["Saheliyon Ki Bari Road"],
      city: "Udaipur, Rajasthan 313001",
      mapsQuery: "Saheliyon Ki Bari, Udaipur, Rajasthan",
      travelNote: "10 minutes from the guest hotels",
    },
    {
      id: "venue_grand_ballroom",
      name: "Sheesh Mahal Ballroom",
      addressLines: ["Jal Mahal Palace Grounds, Lake Pichola East Bank"],
      city: "Udaipur, Rajasthan 313001",
      mapsQuery: "Jal Mahal Palace Grounds, Lake Pichola, Udaipur, Rajasthan",
      travelNote: "Same grounds as the wedding",
    },
  ],

  events: [
    {
      slug: "engagement",
      name: "Engagement",
      meaning: "The first formal promise, made in front of both families.",
      guestVisibilityRule: "event_public",
      dateTime: {
        start: "2027-02-11T19:00:00+05:30",
        end: "2027-02-11T23:00:00+05:30",
        timezone: TZ,
      },
      venueId: "venue_lake_terrace",
      inheritMainVenue: false,
      dressCode: {
        name: "Pastel Elegance",
        description:
          "Soft hues and comfortable evening attire. The terrace is open to the lake breeze, so carry a light shawl.",
        palette: ["Rose", "Sage", "Ivory", "Champagne", "Powder blue"],
      },
      accent: "var(--color-event-engagement)",
      glyph: "ring",
      hero: {
        id: "asset_engagement_hero",
        alt: "Evening terrace above Lake Pichola set for the engagement",
        artwork: "terrace-night",
        status: "approved",
      },
      state: "scheduled",
      rsvp: { enabled: true, deadline: "2027-01-15T23:59:00+05:30" },
      status: "published",
    },
    {
      slug: "haldi",
      name: "Haldi",
      meaning: "Turmeric, sunlight and far too much laughter, at home with family.",
      // Private ceremony: only guests granted this rule ever see it.
      guestVisibilityRule: "event_haldi_family",
      dateTime: {
        start: "2027-02-12T09:30:00+05:30",
        end: "2027-02-12T12:30:00+05:30",
        timezone: TZ,
      },
      venueId: "venue_haveli_courtyard",
      inheritMainVenue: false,
      dressCode: {
        name: "Marigold Morning",
        description:
          "Wear something you will not mind staining. Cottons and light fabrics are perfect.",
        palette: ["Marigold", "Saffron", "Ivory", "Turmeric yellow"],
      },
      accent: "var(--color-event-haldi)",
      glyph: "turmeric",
      hero: {
        id: "asset_haldi_hero",
        alt: "Sunlit haveli courtyard decorated with marigold garlands",
        artwork: "courtyard",
        status: "approved",
      },
      state: "scheduled",
      rsvp: { enabled: true, deadline: "2027-01-15T23:59:00+05:30" },
      status: "published",
    },
    {
      slug: "mehndi",
      name: "Mehndi",
      meaning: "Henna, lanterns and the slow afternoon before the celebration.",
      guestVisibilityRule: "event_public",
      dateTime: {
        start: "2027-02-12T16:00:00+05:30",
        end: "2027-02-12T19:30:00+05:30",
        timezone: TZ,
      },
      venueId: "venue_garden_pavilion",
      inheritMainVenue: false,
      dressCode: {
        name: "Garden Greens",
        description:
          "Three-quarter or short sleeves make henna far easier. The lawn is soft, so avoid thin heels.",
        palette: ["Emerald", "Magenta", "Antique gold", "Fern"],
      },
      accent: "var(--color-event-mehndi)",
      glyph: "henna",
      hero: {
        id: "asset_mehndi_hero",
        alt: "Garden pavilion strung with lanterns for the mehndi",
        artwork: "garden-pavilion",
        status: "approved",
      },
      state: "scheduled",
      rsvp: { enabled: true, deadline: "2027-01-15T23:59:00+05:30" },
      status: "published",
    },
    {
      slug: "sangeet",
      name: "Sangeet",
      meaning: "Both families on one stage, competing very seriously for applause.",
      guestVisibilityRule: "event_public",
      dateTime: {
        start: "2027-02-12T20:30:00+05:30",
        end: "2027-02-13T00:30:00+05:30",
        timezone: TZ,
      },
      venueId: "venue_grand_ballroom",
      inheritMainVenue: false,
      dressCode: {
        name: "Midnight Jewels",
        description: "Bring shoes you can dance in. Dinner is served from 9:30 PM.",
        palette: ["Indigo", "Plum", "Fuchsia", "Gold"],
      },
      accent: "var(--color-event-sangeet)",
      glyph: "music",
      hero: {
        id: "asset_sangeet_hero",
        alt: "Ballroom stage lit for the sangeet performances",
        artwork: "stage",
        status: "approved",
      },
      state: "scheduled",
      rsvp: { enabled: true, deadline: "2027-01-15T23:59:00+05:30" },
      status: "published",
    },
    {
      slug: "wedding",
      name: "Wedding Ceremony",
      meaning: "The pheras at the mandap, as the sun goes down over the lake.",
      guestVisibilityRule: "event_public",
      dateTime: {
        start: "2027-02-13T19:30:00+05:30",
        end: "2027-02-14T01:00:00+05:30",
        timezone: TZ,
      },
      venueId: "venue_lake_palace",
      inheritMainVenue: true,
      dressCode: {
        name: "Traditional Grandeur",
        description:
          "Full Indian formal. The ceremony is partly outdoors on stone, so choose footwear you can stand in.",
        palette: ["Crimson", "Ivory", "Antique gold", "Deep green"],
      },
      accent: "var(--color-event-wedding)",
      glyph: "fire",
      hero: {
        id: "asset_wedding_hero",
        alt: "Floral mandap prepared for the wedding ceremony",
        artwork: "mandap",
        status: "approved",
      },
      state: "scheduled",
      stateNote: "Baraat gathers at 6:30 PM at the main gate.",
      rsvp: { enabled: true, deadline: "2027-01-15T23:59:00+05:30" },
      status: "published",
    },
    {
      slug: "reception",
      name: "Reception",
      meaning: "The last night: dinner, toasts and the dance floor by the water.",
      guestVisibilityRule: "event_public",
      dateTime: {
        start: "2027-02-14T19:00:00+05:30",
        end: "2027-02-14T23:30:00+05:30",
        timezone: TZ,
      },
      venueId: "venue_lake_palace",
      inheritMainVenue: true,
      dressCode: {
        name: "Evening Formal",
        description: "Indian or western formal, whichever you feel most like yourself in.",
        palette: ["Midnight blue", "Champagne", "Silver", "Deep rose"],
      },
      accent: "var(--color-event-reception)",
      glyph: "lights",
      hero: {
        id: "asset_reception_hero",
        alt: "Palace terrace lit for the evening reception",
        artwork: "terrace-night",
        status: "approved",
      },
      state: "scheduled",
      rsvp: { enabled: true, deadline: "2027-01-15T23:59:00+05:30" },
      status: "published",
    },
  ],

  story: [
    {
      id: "story_met",
      label: "Where it started",
      when: "March 2022",
      copy: "A queue outside a bookshop in Jaipur, one plate of kachoris and a disagreement that has still not been settled.",
      image: {
        id: "asset_story_met",
        alt: "",
        artwork: "lake-city",
        status: "approved",
      },
      status: "published",
    },
    {
      id: "story_first_trip",
      label: "The first long drive",
      when: "October 2022",
      copy: "Nine hours to Bundi with a broken air conditioner. Somewhere near Kota they stopped pretending it was casual.",
      image: {
        id: "asset_story_trip",
        alt: "",
        artwork: "garden-pavilion",
        status: "approved",
      },
      status: "published",
    },
    {
      id: "story_families",
      label: "Meeting the families",
      when: "August 2024",
      copy: "Two sets of parents, one dining table, and the discovery that both mothers make almost the same daal.",
      image: {
        id: "asset_story_families",
        alt: "",
        artwork: "courtyard",
        status: "approved",
      },
      status: "published",
    },
    {
      id: "story_proposal",
      label: "The question",
      when: "January 2026",
      copy: "On a terrace in Udaipur at six in the morning, with a ring that had been hidden in a sketchbook for three weeks.",
      image: {
        id: "asset_story_proposal",
        alt: "",
        artwork: "terrace-night",
        status: "approved",
      },
      status: "published",
    },
    {
      id: "story_announcement",
      label: "And now, this",
      when: "February 2027",
      copy: "Back to the same lake, with everyone we love, to make it official.",
      image: {
        id: "asset_story_announcement",
        alt: "",
        artwork: "mandap",
        status: "approved",
      },
      status: "published",
    },
  ],

  families: [
    {
      id: "family_malhotra",
      side: "Aarav's Family",
      name: "The Malhotras",
      hosts: ["Rajeev Malhotra", "Sunita Malhotra"],
      hostsEvents: ["haldi", "wedding"],
      welcomeMessage:
        "We have waited a long time to fill a house with this much noise. Thank you for making the journey to Udaipur — please treat every one of these four days as your own.",
      remembrance:
        "We carry the blessing of Aarav's grandfather, Om Prakash Malhotra, who chose this city for his own wedding in 1961.",
      image: {
        id: "asset_family_malhotra",
        alt: "",
        artwork: "family-crest",
        status: "approved",
      },
      status: "published",
    },
    {
      id: "family_sharma",
      side: "Meera's Family",
      name: "The Sharmas",
      hosts: ["Vinod Sharma", "Kavita Sharma"],
      hostsEvents: ["mehndi", "sangeet", "reception"],
      welcomeMessage:
        "Meera has danced in every corner of our home for twenty-eight years. It is a strange, wonderful thing to hand that music to a new family. Come hungry, and stay late.",
      image: {
        id: "asset_family_sharma",
        alt: "",
        artwork: "family-crest",
        status: "approved",
      },
      status: "published",
    },
  ],

  travel: {
    destination: "Udaipur, Rajasthan",
    arrivalRecommendation: "Arrive by the afternoon of Wednesday 10 February",
    departureRecommendation: "Depart on Monday 15 February after breakfast",
    airport: "Maharana Pratap Airport (UDR), 25 minutes from the hotels",
    railway: "Udaipur City Railway Station, 15 minutes from the hotels",
    pickupAvailable: true,
    pickupNote:
      "Shuttles meet every scheduled flight and train from 9 February. Share your arrival details in your RSVP and a coordinator will confirm your pickup.",
    hotels: [
      {
        id: "hotel_lake_view",
        name: "Lake View Residency",
        area: "Lake Pichola East",
        note: "Main guest hotel. Shuttles to every event depart from the lobby.",
      },
      {
        id: "hotel_amrit",
        name: "Amrit Haveli",
        area: "Gangaur Ghat",
        note: "Heritage rooms in the old city, a short walk from Gangaur Ghat.",
      },
      {
        id: "hotel_city_square",
        name: "City Square Hotel",
        area: "Near the railway station",
        note: "Budget-friendly rooms with the same shuttle service.",
      },
    ],
    image: {
      id: "asset_travel_city",
      alt: "Udaipur lake and city skyline at dusk",
      artwork: "lake-city",
      status: "approved",
    },
    status: "published",
  },

  gallery: {
    caption: "A few favourites from the last four years, while we wait for the new ones.",
    images: [
      { id: "asset_gallery_1", alt: "Aarav and Meera on the Bundi road trip", artwork: "lake-city", status: "approved" },
      { id: "asset_gallery_2", alt: "The proposal terrace at sunrise", artwork: "terrace-night", status: "approved" },
      { id: "asset_gallery_3", alt: "Both families at their first dinner together", artwork: "courtyard", status: "approved" },
      { id: "asset_gallery_4", alt: "Meera performing at a Diwali recital", artwork: "stage", status: "approved" },
      { id: "asset_gallery_5", alt: "Engagement portraits in the palace gardens", artwork: "garden-pavilion", status: "approved" },
      { id: "asset_gallery_6", alt: "Aarav's sketch of the wedding mandap", artwork: "mandap", status: "approved" },
    ],
    // Cut but not yet approved, so nothing is offered for playback.
    highlightReel: {
      id: "asset_gallery_reel",
      poster: { id: "asset_gallery_reel_poster", alt: "", artwork: "couple-portrait", status: "draft" },
      seconds: 18,
      status: "draft",
    },
    status: "published",
  },

  food: {
    assurance:
      "Vegetarian and Jain meals will be available at every celebration, prepared in separate kitchens.",
    vegetarian: true,
    jain: true,
    vegan: true,
    allergyStatement:
      "Please share allergies or dietary requirements in your RSVP. The catering team works from that list directly, and a coordinator will find you on the day if anything needs checking.",
    menusPublished: false,
    status: "published",
  },

  rsvp: {
    enabled: true,
    deadline: "2027-01-15T23:59:00+05:30",
    helpText:
      "You can respond to each celebration separately, and change your answer any time before the deadline.",
    interimNote:
      "The online RSVP form opens in September 2026. If you already know your plans, Priya is happy to record your response now.",
    status: "published",
  },

  blessings: {
    intro: "A few words already sent for Aarav and Meera.",
    acceptedFormats: ["text", "voice", "photo", "video"],
    interimNote:
      "The blessing wall opens alongside the RSVP form. Until then, send a note, a photo or a voice message to Priya and it will be added for you.",
    messages: [
      {
        id: "blessing_1",
        from: "Ishaan and Ritu",
        relation: "Friends from Jaipur",
        message:
          "We were at the bookshop that day. For the record, Ritu saw it coming before either of you did.",
        format: "text",
        moderation: "published",
      },
      {
        id: "blessing_2",
        from: "Nani",
        relation: "Meera's grandmother",
        message:
          "Beta, marriage is mostly about who makes the tea. Take turns and you will be very happy.",
        format: "voice",
        moderation: "published",
      },
      {
        id: "blessing_3",
        from: "The Iyer family",
        relation: "Neighbours",
        message:
          "Thirty years of hearing Meera practise through the wall. We would not trade a single morning of it. Congratulations to you both.",
        format: "text",
        moderation: "approved",
      },
      {
        id: "blessing_4",
        from: "Dev",
        relation: "Aarav's cousin",
        message: "Speech is ready. Nobody can stop me now.",
        format: "video",
        // Still in review, so it is not displayed.
        moderation: "review",
      },
    ],
    status: "published",
  },

  coordinators: [
    {
      id: "coord_wedding",
      role: "Wedding Coordinator",
      name: "Priya Nair",
      phone: "+91 98200 11223",
      whatsapp: "+91 98200 11223",
      email: "priya@aaravmeera-wedding.in",
      hours: "9 AM – 9 PM IST",
      status: "published",
    },
    {
      id: "coord_travel",
      role: "Travel and Pickup",
      name: "Farhan Qureshi",
      phone: "+91 98200 44556",
      whatsapp: "+91 98200 44556",
      hours: "24 hours from 9 February",
      status: "published",
    },
    {
      id: "coord_hotel",
      role: "Hotel and Rooms",
      name: "Anjali Rao",
      phone: "+91 98200 77889",
      email: "stay@aaravmeera-wedding.in",
      hours: "8 AM – 10 PM IST",
      status: "published",
    },
    {
      id: "coord_emergency",
      role: "Day-of Emergency",
      name: "Event Control Desk",
      phone: "+91 98200 00110",
      hours: "During all events",
      status: "published",
    },
  ],

  faqs: [
    {
      question: "Can I bring my children?",
      answer:
        "Yes, at every celebration. There is a supervised play area beside the Sangeet ballroom and again at the Reception.",
      status: "published",
    },
    {
      question: "Is there a plus-one?",
      answer:
        "Your invitation lists the number of seats held for you. If you would like to bring someone else, ask Priya — she can usually make it work.",
      status: "published",
    },
    {
      question: "What will the weather be like?",
      answer:
        "Udaipur in February is roughly 26°C by day and 11°C at night. Evening events are outdoors, so bring a shawl or jacket.",
      status: "published",
    },
    {
      question: "How do I get between the hotel and the events?",
      answer:
        "Shuttles run from the Lake View Residency lobby before and after every event. Departure times are posted at the hotel desk each morning.",
      status: "published",
    },
    {
      question: "Can I take photographs during the ceremony?",
      answer:
        "Please keep phones away during the pheras. The photographers will share everything afterwards, and the gallery here will be updated.",
      status: "published",
    },
  ],

  closing: {
    thankYou:
      "Thank you for being part of our story long before this week, and for showing up now that it gets loud.",
    signature: "With love, Aarav and Meera",
    hashtag: "#AaravFoundHisMeera",
    image: {
      id: "asset_closing",
      alt: "Aarav and Meera beneath the palace arch at night",
      artwork: "couple-portrait",
      status: "approved",
    },
    status: "published",
  },

  hero: {
    id: "asset_hero_palace",
    alt: "The palace grounds on Lake Pichola, decorated for the wedding",
    artwork: "palace-arch",
    status: "approved",
  },

  privacyNotice:
    "Your personal link is private. Room, transport and seating details are only ever shown to you, and RSVP answers are never used for analytics.",
};
