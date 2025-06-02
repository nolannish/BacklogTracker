export const fetchGameDetails = async (appid: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/steam?appid=${appid}`);
  const data = await res.json();

  if (!data.success) throw new Error("Game not found");

  return {
    title: data.data.name,
    coverUrl: data.data.header_image,
    description: data.data.short_description,
    genres: data.data.genres?.map((g: any) => g.description),
    status: "Wishlist", // Or map to your own status system
  };
};