import { customAlphabet } from "nanoid";

const idAlphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
const codeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars

export const makeId = customAlphabet(idAlphabet, 12);
export const makeAccessCode = customAlphabet(codeAlphabet, 6);

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "project"
  );
}
