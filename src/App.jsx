import { useEffect, useMemo, useRef, useState } from 'react'
import { CITIES, LOCATIONS, LORE } from './data/locations.js'
import { distanceMi, optimizeOrder } from './lib/trip.js'
import { narrate, stopNarration } from './lib/narrate.js'
import MapView from './components/MapView.jsx'
import LocationCard from './components/LocationCard.jsx'
import TripPanel from './components/TripPanel.jsx'
import Intro from './components/Intro.jsx'

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
  const [showIntro, setShowIntro] = useState(true)
  const [city, setCity] = useState('all')
  const [lore, setLore] = useState('all')
  const [sort, setSort] = useState('default')
  const [afterDarkOnly, setAfterDarkOnly] = useState(false)
  const [hidePrivate, setHidePrivate] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [trip, setTrip] = useState(loadTrip)
  const [userPos, setUserPos] = useState(null)
  const [geoStatus, setGeoStatus] = useState('')
  const [speakingId, setSpeakingId] = useState(null)
  const cardRefs = useRef({})

  useEffect(() => {
    try {
      localStorage.setItem(TRIP_KEY, JSON.stringify(trip.map((t) => t.id)))
    } catch {
      // storage unavailable (private mode); trip just won't persist
    }
  }, [trip])

  useEffect(() => stopNarration, [])

  const distances = useMemo(() => {
    if (!userPos) return {}
    return Object.fromEntries(LOCATIONS.map((l) => [l.id, distanceMi(userPos, l)]))
  }, [userPos])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = LOCATIONS.filter(
      (l) =>
        (city === 'all' || l.city === city) &&
        (lore === 'all' || l.lore === lore) &&
        (!afterDarkOnly || l.afterDark) &&
        (!hidePrivate || l.access !== 'restricted') &&
        (!q || `${l.name} ${l.story} ${l.address}`.toLowerCase().includes(q)),
    )
    if (sort === 'fright') return [...list].sort((a, b) => b.fright - a.fright)
    if (sort === 'near' && userPos) return [...list].sort((a, b) => distances[a.id] - distances[b.id])
    if (sort === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [city, lore, sort, afterDarkOnly, hidePrivate, query, userPos, distances])

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

  const toggleNarration = (loc) => {
    if (speakingId === loc.id) {
      stopNarration()
      setSpeakingId(null)
      return
    }
    setSpeakingId(loc.id)
    select(loc)
    narrate(loc, { onEnd: () => setSpeakingId((id) => (id === loc.id ? null : id)) })
  }

  const findNearMe = () => {
    if (!('geolocation' in navigator)) {
      setGeoStatus('Location is not available in this browser.')
      return
    }
    setGeoStatus('Finding you…')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setSort('near')
        setCity('all')
        setGeoStatus('')
      },
      () => setGeoStatus('Couldn\'t get your location. Check location permission.'),
      { enableHighAccuracy: false, timeout: 10000 },
    )
  }

  const legendCount = LOCATIONS.filter((l) => l.lore === 'legend').length

  return (
    <>
      {showIntro && <Intro count={LOCATIONS.length} onEnter={() => setShowIntro(false)} />}
      <div className="app">
        <header className="hero">
          <h1>
            <span className="hero-ghost" aria-hidden="true">👻</span> <span className="flicker">Haunted Gulf Coast</span>
          </h1>
          <p>
            {LOCATIONS.length} reportedly haunted places, rumors and ghost tours across Beaumont, Bridge City &amp; Orange, Port
            Arthur and Lake Charles, including {legendCount} famous local legends. Filter, explore the map, listen to the stories
            and build a ghost-hunting road trip.
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
            <button type="button" className={`chip chip-near${userPos ? ' active' : ''}`} onClick={findNearMe}>
              📍 Near me
            </button>
          </div>
          {geoStatus && <p className="muted geo-status">{geoStatus}</p>}
          <div className="filter-row">
            <input
              type="search"
              placeholder="Search ghosts, places, streets…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <select value={lore} onChange={(e) => setLore(e.target.value)} aria-label="Story type">
              <option value="all">Legends, rumors &amp; tours</option>
              {Object.entries(LORE).map(([id, l]) => (
                <option key={id} value={id}>{l.label}</option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
              <option value="default">Sort: by city</option>
              <option value="fright">Sort: most haunted first</option>
              <option value="name">Sort: A–Z</option>
              {userPos && <option value="near">Sort: nearest to me</option>}
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
            <MapView locations={visible} selected={selected} onSelect={select} trip={trip} userPos={userPos} />
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
                  distance={userPos ? distances[loc.id] : null}
                  speaking={speakingId === loc.id}
                  onSelect={select}
                  onToggleTrip={toggleTrip}
                  onNarrate={toggleNarration}
                />
              ))}
              {visible.length === 0 && <p className="muted">Nothing spooky matches those filters.</p>}
            </div>
          </aside>
        </main>

        <footer className="foot">
          These are reported ghost stories and rumors, not verified fact. Respect private property, cemeteries and posted hours.
          Coordinates are approximate.
        </footer>
      </div>
    </>
  )
}
