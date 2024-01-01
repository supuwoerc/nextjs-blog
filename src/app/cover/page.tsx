import { getFileBuffer } from "@/utils";
import { ImageResponse } from "next/server";
import path from "path";
import React, { FC } from "react";

interface CoverProps {
  // 在这里定义组件的属性
}

const Cover: FC<CoverProps> = (props) => {
  return <>123</>;
};

// export async function getStaticProps() {
//   const callback = (localFont?: Buffer, name?: string) => {
//     const fonts = [];
//     if (localFont) {
//       fonts.push({
//         name: "RubikDoodleShadow-Regular",
//         data: localFont,
//       });
//     }
//     return {
//       props: {
//         image: new ImageResponse(<div>123</div>, {
//           width: 1200,
//           height: 800,
//         }),
//       },
//     };
//   };
//   const filePath = path.join(
//     __dirname,
//     "../../../public/fonts/Rubik_Doodle_Shadow/RubikDoodleShadow-Regular.ttf"
//   );
//   try {
//     const localFont = await getFileBuffer(filePath);
//     return callback(localFont, "RubikDoodleShadow-Regular");
//   } catch (error) {
//     console.log(error);
//     return callback();
//   }
// }

export default Cover;
