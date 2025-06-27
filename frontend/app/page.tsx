import Image from 'next/image';
import './globals.css';

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
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch wines')
  }
  return await res.json()
}

export default async function Page() {
  let wines: Wine[] = [];
  let fetchError = false;
  try {
    wines = await getWines();
  } catch {
    fetchError = true;
  }
  
  return (
    <div className="wine-showcase">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-text">Vintner&apos;s Collection</span>
          </div>
          <nav className="nav">
            <a href="#wines" className="nav-link">
              Wines
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Discover Exceptional Wines</h1>
            <p className="hero-description">
              Curated collection of the world&#39;s finest wines from renowned vineyards and emerging estates. Each bottle
              tells a story of tradition, terroir, and craftsmanship.
            </p>
            <button className="hero-button">Explore Collection</button>
          </div>
          <div className="hero-image">
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Wine bottles"
              width={500}
              height={600}
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Featured Wines */}
      <section id="wines" className="wines-section">
        <div className="wines-container">
          <div className="wines-header">
        <h2 className="wines-title">Featured Wines</h2>
        <p className="wines-subtitle">Handpicked selections from our master sommelier</p>
          </div>

        <div className="wines-grid">
        {fetchError ? (
          <div className="wine-error-message">
            <p>Failed to load wines. Please try again later.</p>
          </div>
        ) : (
          wines.map((wine) => (
            <div key={wine.id} className="wine-card group" style={{ marginBottom: 20 }}>
              <div className="wine-image-container">
                <Image
                  src="/"
                  alt={wine.name}
                  width={300}
                  height={400}
                  className="wine-image group-hover:scale-105"
                  style={{ objectFit: 'cover' }}
                />
                <div className="wine-overlay group-hover:opacity-100">
                  <button className="wine-button">View Details</button>
                </div>
              </div>

              <div className="wine-info">
                <div className="wine-header-info">
                  <h3 className="wine-name">{wine.name} ({wine.year})</h3>
                  <span className="wine-price">${wine.price}</span>
                </div>

                <div className="wine-meta">
                  <div className="wine-location">
                    {/* You can add a MapPin icon here if available */}
                    <span>{wine.country}</span>
                  </div>
                  <div className="wine-vintage">
                    {/* You can add a Calendar icon here if available */}
                    <span>{wine.year}</span>
                  </div>
                </div>

                {/* If you want to show a rating, add it here if available in your Wine type */}

                <p className="wine-description">{wine.description}</p>
              </div>
            </div>
          ))
        )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="footer-logo-text">Vintner&#39;s Collection</span>
              </div>
              <p className="footer-description">
                Bringing you the world&#39;s finest wines with expert curation and exceptional service.
              </p>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <a href="#wines" className="footer-link">
                    Wine Collection
                  </a>
                </li>
                <li>
                  <a href="#about" className="footer-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="footer-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Wine Club
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Contact Info</h4>
              <div className="footer-contact">
                <p>123 Wine Street</p>
                <p>Napa Valley, CA 94558</p>
                <p>Phone: (555) 123-WINE</p>
                <p>Email: info@vintnerscollection.com</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Vintner&apos;s Collection. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
