import { getFileBuffer } from "@/utils";
import { ImageResponse } from "next/server";
import path from "path";
import { siteConfig } from "@/config/index";

// https://www.haydenhayden.com/blog/next-og
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title")?.slice(0, 50) ?? siteConfig.domain;
  const filePath = path.join(
    process.cwd(),
    "public/fonts/Caveat/static/Caveat-Regular.ttf"
  );
  const callback = (localFont?: Buffer, name?: string) => {
    const fonts = [];
    if (localFont) {
      fonts.push({
        name: name ?? "",
        data: localFont,
      });
    }
    return new ImageResponse(
      (
        <div
          tw="flex w-full h-full flex-col text-[50px] text-white"
          style={{
            background: "linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c)",
            padding: "100px 32px",
            position: "relative",
          }}
        >
          <div
            style={{ fontSize: 30, position: "absolute", left: 32, top: 32 }}
          >
            What&apos;s going on
          </div>
          <div
            style={{
              fontSize: 50,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              position: "absolute",
              bottom: 32,
              right: 32,
            }}
          >
            {siteConfig.domain}
          </div>
        </div>
      ),
      {
        width: 800,
        height: 600,
        fonts,
      }
    );
  };
  try {
    const localFont = await getFileBuffer(filePath);
    return callback(localFont, "Caveat");
  } catch (error) {
    return callback();
  }
}
