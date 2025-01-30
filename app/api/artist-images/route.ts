import { NextResponse } from "next/server"

async function getSpotifyToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify token")
  }

  const data = await response.json()
  return data.access_token
}

async function getArtistImage(artistName: string, token: string) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(artistName)}&limit=1`,
      { headers: { Authorization: `Bearer ${token}` } },
    )

    if (!response.ok) {
      console.error(`Spotify API error for ${artistName}:`, await response.text())
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
		console.log(data)
    return data.artists.items[0]?.images[0]?.url || null
  } catch (error) {
    console.error(`Error in getArtistImage for ${artistName}:`, error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const { artists } = await request.json()
    const token = await getSpotifyToken()

    const artistImages = await Promise.all(
      artists.map(async (artist: { id: string; name: string }) => {
        try {
          const imageUrl = await getArtistImage(artist.name, token)
          return {
            id: artist.id,
            imageUrl: imageUrl || `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(artist.name)}`,
          }
        } catch (error) {
          console.error(`Error fetching image for ${artist.name}:`, error)
          return {
            id: artist.id,
            imageUrl: `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(artist.name)}`,
          }
        }
      }),
    )

    return NextResponse.json({ artistImages })
  } catch (error) {
    console.error("Error in artist-images API route:", error)
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

