import { forwardRef } from 'react'
import { CATEGORIES, CITIES, LORE, ACCESS } from '../data/locations.js'
import { canNarrate } from '../lib/narrate.js'
import FrightMeter from './FrightMeter.jsx'

const cityName = (id) => CITIES.find((c) => c.id === id)?.name

const LocationCard = forwardRef(function LocationCard(
  { location: loc, selected, inTrip, distance, speaking, checkedIn, onSelect, onToggleTrip, onNarrate, onCheckIn },
  ref,
) {
  const restricted = loc.access === 'restricted'
  return (
    <article ref={ref} className={`card card-${loc.lore}${selected ? ' card-selected' : ''}`} onClick={() => onSelect(loc)}>
      <header className="card-head">
        <span className="card-icon" aria-hidden="true">{CATEGORIES[loc.category].icon}</span>
        <div className="card-title">
          <h3>{loc.name}</h3>
          <p className="card-meta">
            {cityName(loc.city)} · {CATEGORIES[loc.category].label}
            {distance != null && <> · <strong className="distance">{distance.toFixed(1)} mi away</strong></>}
          </p>
        </div>
      </header>

      <FrightMeter value={loc.fright} />

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
        <span className="card-buttons">
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
          {canNarrate && (
            <button
              type="button"
              className={`btn btn-ghost${speaking ? ' speaking' : ''}`}
              aria-pressed={speaking}
              onClick={(e) => {
                e.stopPropagation()
                onNarrate(loc)
              }}
            >
              {speaking ? '■ Stop' : '🔊 Tell me the story'}
            </button>
          )}
          <button
            type="button"
            className="btn btn-ghost btn-checkin"
            onClick={(e) => {
              e.stopPropagation()
              onCheckIn(loc)
            }}
          >
            {checkedIn ? '🏅 Checked in' : '📸 Check in'}
          </button>
        </span>
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
