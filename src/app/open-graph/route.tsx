import { getFileBuffer } from "@/utils";
import { ImageResponse } from "next/server";
import path from "path";

export async function GET(req: Request) {
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
    return new ImageResponse(<div tw="text-red-950">whats’ going on</div>, {
      width: 1200,
      height: 800,
      fonts,
    });
  };
  try {
    const localFont = await getFileBuffer(filePath);
    return callback(localFont, "RubikDoodleShadow-Regular");
  } catch (error) {
    return callback();
  }
}
