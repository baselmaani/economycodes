import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { MAX_UPLOAD_BYTES } from "@/lib/admin/prepare-image";
import { isAdmin } from "@/lib/admin/session";

/**
 * Issues short-lived client tokens so the dashboard can upload images
 * straight from the browser to Vercel Blob (bypassing the server-action body
 * limit). The media row is created afterwards by createMediaAction.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("media/")) {
          throw new Error("Uploads must go under media/");
        }
        return {
          // Raster formats only: SVG can carry script.
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
            "image/gif",
          ],
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    );
  }
}
