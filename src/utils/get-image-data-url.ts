import { KnownResult } from "@/types";
import html2canvas from "html2canvas";

export async function getImageDataURL(
  DOMElement: HTMLElement
): Promise<KnownResult<{ imageDataURL: string }>> {
  try {
    const canvas = await html2canvas(DOMElement);

    if (!canvas) return { ok: false, error: "Failed to create image" };

    const imageDataURL = canvas.toDataURL();

    if (!imageDataURL)
      return {
        ok: false,
        error: "There was an error, the resulting image is empty",
      };

    return { ok: true, data: { imageDataURL } };
  } catch (error) {
    return { ok: false, error: "Failed to create image" };
  }
}
