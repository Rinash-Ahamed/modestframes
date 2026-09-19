import { cookies } from "next/headers";
import { verify } from "./session";

export const GALLERY_COOKIE = "modestframes_gallery";

export async function hasGalleryAccess(projectId: string): Promise<boolean> {
  const store = await cookies();
  const token = store.get(GALLERY_COOKIE)?.value;
  const payload = await verify<{ ids: string[] }>(token);
  return !!payload?.ids?.includes(projectId);
}
