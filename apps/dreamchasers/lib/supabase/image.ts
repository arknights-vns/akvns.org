"use client";

type ImageProps = {
    src: string;
    width: number;
    quality?: number;
};

// https://supabase.com/docs/guides/storage/image-transformations#nextjs-loader
export default function supabaseLoader({ src, width, quality }: ImageProps) {
    const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_CDN_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
    const directory = supabaseHost!.endsWith("supabase.co") ? "object" : "render/image";
    const url = new URL(`${supabaseHost}/storage/v1/${directory}/public${src}`);
    url.searchParams.set("width", width.toString());
    url.searchParams.set("quality", (quality || 75).toString());
    return url.href;
}
