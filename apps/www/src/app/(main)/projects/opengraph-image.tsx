import { ImageResponse } from "next/og";
import DefaultOpengraph from "@/components/opengraph/DefaultOpengraph";
import { getStationDefaultOpengraphFonts } from "@/lib/utils.server";

export default async function ProjectsOGImage() {
  return new ImageResponse(
    <DefaultOpengraph description="Các dự án do Arknights VNS hoặc cộng đồng tổ chức." title="Dự án" />,
    {
      fonts: [...(await getStationDefaultOpengraphFonts())],
    }
  );
}
