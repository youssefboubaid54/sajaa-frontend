export function getEnvPublic() {
  return {
    META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    TIKTOK_PIXEL_ID: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
    SNAP_PIXEL_ID: process.env.NEXT_PUBLIC_SNAP_PIXEL_ID,
    API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
    WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "966500000000",
  };
}
