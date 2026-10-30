import { useEffect, useMemo, useRef, useState } from 'react'
import { CITIES, LOCATIONS, LORE } from './data/locations.js'
import { optimizeOrder } from './lib/trip.js'
import MapView from './components/MapView.jsx'
import LocationCard from './components/LocationCard.jsx'
import TripPanel from './components/TripPanel.jsx'

const TRIP_KEY = 'haunted-gulf-coast:trip'

function loadTrip() {
  try {
    const ids = JSON.parse(localStorage.getItem(TRIP_KEY) || '[]')
    return ids.map((id) => LOCATIONS.find((l) => l.id === id)).filter(Boolean)
  } catch {
    return []
  }
}

export default function App() {
  const [city, setCity] = useState('all')
  const [lore, setLore] = useState('all')
  const [afterDarkOnly, setAfterDarkOnly] = useState(false)
  const [hidePrivate, setHidePrivate] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [trip, setTrip] = useState(loadTrip)
  const cardRefs = useRef({})

  useEffect(() => {
    try {
      localStorage.setItem(TRIP_KEY, JSON.stringify(trip.map((t) => t.id)))
    } catch {
      // storage unavailable (private mode); trip just won't persist
    }
  }, [trip])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LOCATIONS.filter(
      (l) =>
        (city === 'all' || l.city === city) &&
        (lore === 'all' || l.lore === lore) &&
        (!afterDarkOnly || l.afterDark) &&
        (!hidePrivate || l.access !== 'restricted') &&
        (!q || `${l.name} ${l.story} ${l.address}`.toLowerCase().includes(q)),
    )
  }, [city, lore, afterDarkOnly, hidePrivate, query])

  const select = (loc) => {
    setSelected(loc)
    cardRefs.current[loc.id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const toggleTrip = (loc) =>
    setTrip((t) => (t.some((s) => s.id === loc.id) ? t.filter((s) => s.id !== loc.id) : [...t, loc]))

  const moveStop = (i, dir) =>
    setTrip((t) => {
      const next = [...t]
      ;[next[i], next[i + dir]] = [next[i + dir], next[i]]
      return next
    })

  const legendCount = LOCATIONS.filter((l) => l.lore === 'legend').length

  return (
    <div className="app">
      <header className="hero">
        <h1>
          <span aria-hidden="true">👻</span> Haunted Gulf Coast
        </h1>
        <p>
          {LOCATIONS.length} reportedly haunted places, rumors and ghost tours across Beaumont, Bridge City &amp; Orange, Port
          Arthur and Lake Charles, including {legendCount} famous local legends. Filter, explore the map and build a ghost-hunting
          road trip.
        </p>
      </header>

      <section className="filters" aria-label="Filters">
        <div className="chips" role="group" aria-label="City">
          <button type="button" className={city === 'all' ? 'chip active' : 'chip'} onClick={() => setCity('all')}>
            All cities
          </button>
          {CITIES.map((c) => (
            <button key={c.id} type="button" className={city === c.id ? 'chip active' : 'chip'} onClick={() => setCity(c.id)}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <input
            type="search"
            placeholder="Search ghosts, places, streets…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          <select value={lore} onChange={(e) => setLore(e.target.value)} aria-label="Legend strength">
            <option value="all">Legends, rumors &amp; tours</option>
            {Object.entries(LORE).map(([id, l]) => (
              <option key={id} value={id}>{l.label}</option>
            ))}
          </select>
          <label className="check">
            <input type="checkbox" checked={afterDarkOnly} onChange={(e) => setAfterDarkOnly(e.target.checked)} /> After dark
          </label>
          <label className="check">
            <input type="checkbox" checked={hidePrivate} onChange={(e) => setHidePrivate(e.target.checked)} /> Hide private
          </label>
        </div>
      </section>

      <main className="layout">
        <div className="map-wrap">
          <MapView locations={visible} selected={selected} onSelect={select} trip={trip} />
          <div className="legend" aria-hidden="true">
            <span><i className="dot dot-legend" /> Legend</span>
            <span><i className="dot dot-rumor" /> Rumor</span>
            <span><i className="dot dot-talk" /> Tour / talk</span>
          </div>
        </div>

        <aside className="side">
          <TripPanel
            trip={trip}
            onRemove={toggleTrip}
            onMove={moveStop}
            onOptimize={() => setTrip((t) => optimizeOrder(t))}
            onClear={() => setTrip([])}
          />
          <p className="result-count">
            {visible.length} place{visible.length === 1 ? '' : 's'}
          </p>
          <div className="cards">
            {visible.map((loc) => (
              <LocationCard
                key={loc.id}
                ref={(el) => (cardRefs.current[loc.id] = el)}
                location={loc}
                selected={selected?.id === loc.id}
                inTrip={trip.some((t) => t.id === loc.id)}
                onSelect={select}
                onToggleTrip={toggleTrip}
              />
            ))}
            {visible.length === 0 && <p className="muted">Nothing spooky matches those filters.</p>}
          </div>
        </aside>
      </main>

      <footer className="foot">
        These are reported ghost stories and rumors, not verified fact. Respect private property, cemeteries and posted hours. Coordinates are approximate.
      </footer>
    </div>
  )
}
