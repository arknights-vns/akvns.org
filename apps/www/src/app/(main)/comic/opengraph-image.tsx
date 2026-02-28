import { ImageResponse } from "next/og";
import DefaultOpengraph from "@/components/opengraph/DefaultOpengraph";
import { getStationDefaultOpengraphFonts } from "@/lib/utils.server";

export default async function OgImage() {
  return new ImageResponse(
    <DefaultOpengraph
      description="Các đầu truyện do đội ngũ dịch thuật @terrastationvn hoặc các bên có hợp tác với Arknights VNS."
      title="Truyện tại Trạm"
    />,
    {
      fonts: [...(await getStationDefaultOpengraphFonts())],
    }
  );
}
