import { ImageResponse } from "next/og";
import { DefaultOpengraph, getStationDefaultOpengraphFonts } from "@/components/opengraph/DefaultOpengraph";

export default async function ProjectsOGImage() {
  return new ImageResponse(
    <DefaultOpengraph description="Các dự án do Arknights VNS hoặc cộng đồng tổ chức." title="Dự án" />,
    {
      fonts: [...(await getStationDefaultOpengraphFonts())],
    }
  );
}
