import { getFileBuffer } from "@/utils";
import { ImageResponse } from "next/server";
import path from "path";
import { siteConfig } from "@/config/index";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title")?.slice(0, 50) ?? siteConfig.domain;
  const filePath = path.join(
    process.cwd(),
    "/public/fonts/Rubik_Doodle_Shadow/RubikDoodleShadow-Regular.ttf"
  );
  const callback = (localFont?: Buffer, name?: string) => {
    const fonts = [];
    if (localFont) {
      fonts.push({
        name: "RubikDoodleShadow-Regular",
        data: localFont,
      });
    }
    return new ImageResponse(
      (
        <div tw="flex w-full h-full flex-col  text-white">
          <div tw="flex flex-col w-full">
            <div tw={`flex w-full h-full`}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 50,
                  width: "100%",
                  fontStyle: "normal",
                  color: "#000",
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                  background: "linear-gradient(to top, #dfe9f3 0%, white 100%)",
                }}
              >
                <div>{title}</div>
                <div style={{ fontSize: 30 }}>What's going on</div>
                <div style={{ fontSize: 16 }}>
                  {"author@" + siteConfig.author}
                </div>
                <div style={{ fontSize: 16 }}>
                  {"email@" + siteConfig.email}
                </div>
              </div>
            </div>
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
    return callback(localFont, "RubikDoodleShadow-Regular");
  } catch (error) {
    return callback();
  }
}
