import { forwardRef } from 'react'
import { CATEGORIES, CITIES, LORE, ACCESS } from '../data/locations.js'

const cityName = (id) => CITIES.find((c) => c.id === id)?.name

const LocationCard = forwardRef(function LocationCard({ location: loc, selected, inTrip, onSelect, onToggleTrip }, ref) {
  const restricted = loc.access === 'restricted'
  return (
    <article ref={ref} className={`card${selected ? ' card-selected' : ''}`} onClick={() => onSelect(loc)}>
      <header className="card-head">
        <span className="card-icon" aria-hidden="true">{CATEGORIES[loc.category].icon}</span>
        <div>
          <h3>{loc.name}</h3>
          <p className="card-meta">
            {cityName(loc.city)} · {CATEGORIES[loc.category].label}
          </p>
        </div>
      </header>

      <div className="tags">
        <span className={`tag tag-${loc.lore}`}>{LORE[loc.lore].label}</span>
        <span className={`tag tag-access-${loc.access}`}>{ACCESS[loc.access]}</span>
        {loc.afterDark && <span className="tag tag-night">🌙 After dark</span>}
      </div>

      <p className="story">{loc.story}</p>
      <p className="tip">
        <strong>Visit tip:</strong> {loc.tip}
      </p>
      <p className="address">📍 {loc.address}</p>

      <footer className="card-actions">
        <button
          type="button"
          className={inTrip ? 'btn btn-ghost' : 'btn'}
          disabled={restricted && !inTrip}
          title={restricted ? 'Private property: view it from a public spot instead' : undefined}
          onClick={(e) => {
            e.stopPropagation()
            onToggleTrip(loc)
          }}
        >
          {inTrip ? '✓ In trip (remove)' : restricted ? 'No public access' : '+ Add to trip'}
        </button>
        <span className="sources">
          {loc.sources.map((url, i) => (
            <a key={url} href={url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
              source {i + 1}
            </a>
          ))}
        </span>
      </footer>
    </article>
  )
})

export default LocationCard
