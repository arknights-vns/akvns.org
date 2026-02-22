import { ImageResponse } from "next/og";
import DefaultOpengraph from "@/components/opengraph/DefaultOpengraph";
import { getStationDefaultOpengraph } from "@/lib/utils.server";

export default async function ProjectsOGImage() {
  return new ImageResponse(
    <DefaultOpengraph description="Toàn bộ nhân sự đang hoạt động tại Arknights VNS." title="Nhân sự" />,
    {
      fonts: [...(await getStationDefaultOpengraph())],
    }
  );
}
