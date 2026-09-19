import { Category } from "./types";

export const studio = {
  name: "ModestFrames",
  fullName: "ModestFrames Photography",
  founder: "Studio of a single photographer & a small second-shooter team",
  tagline: "Photography for the moment that already knew it mattered.",
  city: "Coimbatore",
  region: "Tamil Nadu",
  email: "hello@modestframes.studio",
  phone: "+91 824 860 6826",
  whatsappUrl: "https://wa.me/918248606826",
  instagram: "@modest_frames_",
  instagramUrl: "https://www.instagram.com/modest_frames_/",
};

export interface CategoryInfo {
  name: Category;
  slug: string;
  short: string;
  description: string;
  plate: number; // which placeholder plate to use as the category's lead image
}

export const CATEGORY_INFO: CategoryInfo[] = [
  {
    name: "Wedding",
    slug: "wedding",
    short: "The full account of the day, told without staging it twice.",
    description:
      "Two families, one continuous day, and no moment recreated for the camera. Full coverage from the first knot tied in a dupatta to the last dance under string lights - documentary in the unscripted moments, directed only where tradition calls for it.",
    plate: 2,
  },
  {
    name: "Pre-Wedding",
    slug: "pre-wedding",
    short: "A quieter session before the noise of the wedding begins.",
    description:
      "One evening, two people, and a location chosen for what the light does there at that hour. Pre-wedding sessions are shot as a story in themselves, not a rehearsal for the bigger day.",
    plate: 4,
  },
  {
    name: "Post-Wedding",
    slug: "post-wedding",
    short: "For the portraits there wasn't time for on the day itself.",
    description:
      "Weddings rarely leave room for a slow, considered portrait session. This is that session - scheduled for the week after, when there's finally time to do it properly.",
    plate: 6,
  },
  {
    name: "Engagement",
    slug: "engagement",
    short: "The announcement, framed the way it deserves to be.",
    description:
      "A shorter session built around one relationship and the way two people actually stand next to each other, before the wedding machinery takes over.",
    plate: 9,
  },
  {
    name: "Baby Shower",
    slug: "baby-shower",
    short: "The room, the ritual, and everyone who came to fill it.",
    description:
      "Godh bharai, seemantham, or simply a room full of people celebrating - covered with the same attention given to a wedding, at a fraction of the scale.",
    plate: 3,
  },
  {
    name: "Maternity",
    slug: "maternity",
    short: "A last, unhurried record of before.",
    description:
      "Soft, low-contrast portraiture built around natural light and very little else. Studio or home, whichever the family is more themselves in.",
    plate: 11,
  },
  {
    name: "Newborn",
    slug: "newborn",
    short: "The first ten days, photographed on the baby's schedule.",
    description:
      "No forced poses, no long sessions - newborn shoots here run short, at home, on infant time, guided by a photographer who has done this often enough to work around a feeding schedule.",
    plate: 5,
  },
  {
    name: "Family",
    slug: "family",
    short: "Everyone in the same frame, looking like themselves.",
    description:
      "Multi-generation family portraits shot to be printed and hung, not scrolled past - deliberate about who stands where, and why.",
    plate: 8,
  },
  {
    name: "Events",
    slug: "events",
    short: "Corporate, cultural, or private - covered end to end.",
    description:
      "Product launches, anniversaries, religious functions, and private parties, photographed for the record and for the retelling.",
    plate: 13,
  },
];

export const process_ = [
  {
    step: "01",
    title: "Consultation",
    body: "A call or a coffee. We talk through the day, the family, the light at your venue, and whether this studio is the right fit - before either of us commits.",
  },
  {
    step: "02",
    title: "The Shoot",
    body: "Full-day or session coverage, shot to move quietly through the event rather than direct it. Every hour is scouted for light in advance.",
  },
  {
    step: "03",
    title: "The Edit",
    body: "Every frame is culled by hand - no batch presets applied blind. Delivery of a curated proof gallery typically takes 10–15 working days.",
  },
  {
    step: "04",
    title: "Your Selection",
    body: "You review the proof gallery privately, mark your favourites, and submit your selection through this site - no spreadsheets, no email threads.",
  },
  {
    step: "05",
    title: "Delivery",
    body: "Final retouched images, and prints or albums if commissioned, delivered on the timeline agreed at consultation.",
  },
];

export const testimonials = [
  {
    quote:
      "We forgot the camera was there for most of the day, and then the gallery arrived and every hard-to-photograph relative looked like themselves. That's the part people don't expect.",
    name: "Anika & Rohan",
    context: "Wedding, November 2025",
  },
  {
    quote:
      "The proof gallery meant my whole family could weigh in on the maternity shots without a single WhatsApp thread. Small thing, made the week easier.",
    name: "Divya S.",
    context: "Maternity session",
  },
  {
    quote:
      "Asked for something that wouldn't look like every other pre-wedding shoot from this city. Got exactly that.",
    name: "Karthik M.",
    context: "Pre-Wedding session",
  },
];

export const faqs = [
  {
    q: "How do we get access to our photo gallery?",
    a: "After your shoot, you'll receive a private access code by email or message. Enter it on the Client Gallery page - no account or password to remember.",
  },
  {
    q: "How many images can we select?",
    a: "Your package includes a set number of final retouched images, shown at the top of your gallery. You can select up to that number; anything beyond is available as a paid add-on.",
  },
  {
    q: "Can more than one family member choose?",
    a: "Yes - the access code can be shared with anyone you'd like input from. Selections are saved as you go, and only submitted once you confirm.",
  },
  {
    q: "What happens after we submit our selection?",
    a: "You'll get a confirmation, and retouching begins on exactly the frames you chose. Turnaround time is confirmed at your consultation.",
  },
];
