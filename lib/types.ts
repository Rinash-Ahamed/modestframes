export type Category =
  | "Wedding"
  | "Pre-Wedding"
  | "Post-Wedding"
  | "Engagement"
  | "Baby Shower"
  | "Maternity"
  | "Newborn"
  | "Family"
  | "Events";

export const CATEGORIES: Category[] = [
  "Wedding",
  "Pre-Wedding",
  "Post-Wedding",
  "Engagement",
  "Baby Shower",
  "Maternity",
  "Newborn",
  "Family",
  "Events",
];

export interface ProofImage {
  id: string;
  filename: string;
  url: string;
  uploadedAt: string;
  width?: number;
  height?: number;
}

export type ProjectStatus = "uploading" | "ready" | "selected" | "delivered";

export interface Project {
  id: string;
  slug: string;
  clientNames: string;
  category: Category;
  shootDate: string;
  accessCode: string;
  status: ProjectStatus;
  maxSelections: number;
  coverImageId: string | null;
  images: ProofImage[];
  selections: string[];
  selectionNote: string;
  selectionSubmittedAt: string | null;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: Category | "Not sure";
  eventDate: string;
  message: string;
  createdAt: string;
  status: "new" | "responded" | "archived";
}

export interface Database {
  projects: Project[];
  inquiries: Inquiry[];
}
