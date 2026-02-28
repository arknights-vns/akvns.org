import { ImageResponse } from "next/og";
import { DefaultOpengraph, getStationDefaultOpengraphFonts } from "@/components/opengraph/DefaultOpengraph";

export default async function ProjectsOGImage() {
  return new ImageResponse(
    <DefaultOpengraph description="Toàn bộ nhân sự đang hoạt động tại Arknights VNS." title="Nhân sự" />,
    {
      fonts: [...(await getStationDefaultOpengraphFonts())],
    }
  );
}
