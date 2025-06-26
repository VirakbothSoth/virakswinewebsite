// app/page.js

export const metadata = {
  title: "Dad's Wine Showcase 🍷",
}

interface Wine {
  id: number;
  name: string;
  year: number;
  description: string;
  country: string;
  price: number;
  image_url?: string;
}

async function getWines(): Promise<Wine[]> {
  const res = await fetch('http://localhost:8000/api/wines/', {
    // next.js caching options to always fetch fresh data
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch wines')
  }
  return res.json()
}

export default async function Page() {
  const wines: Wine[] = await getWines()

  return (
    <main style={{ padding: 20 }}>
      <h1>Dad's Wine Showcase 🍷</h1>
      <div>
        {wines.map((wine) => (
          <div key={wine.id} style={{ marginBottom: 20 }}>
            <h2>{wine.name} ({wine.year})</h2>
            <p>{wine.description}</p>
            <p>Country: {wine.country}</p>
            <p>Price: ${wine.price}</p>
            {wine.image_url && <img src={wine.image_url} alt={wine.name} width={200} />}
          </div>
        ))}
      </div>
    </main>
  )
}
