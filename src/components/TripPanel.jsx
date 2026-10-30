import { directionsUrl, totalMiles } from '../lib/trip.js'

export default function TripPanel({ trip, onRemove, onMove, onOptimize, onClear }) {
  const url = directionsUrl(trip)
  return (
    <section className="trip" aria-label="Your ghost trip">
      <div className="trip-head">
        <h2>🕯️ Your ghost trip</h2>
        {trip.length > 0 && (
          <span className="trip-stats">
            {trip.length} stop{trip.length > 1 ? 's' : ''} · ~{totalMiles(trip).toFixed(0)} mi straight-line
          </span>
        )}
      </div>

      {trip.length === 0 ? (
        <p className="muted">Add places from the list to plan a route.</p>
      ) : (
        <>
          <ol className="trip-list">
            {trip.map((s, i) => (
              <li key={s.id}>
                <span className="trip-num">{i + 1}</span>
                <span className="trip-name">{s.name}</span>
                <span className="trip-btns">
                  <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => onMove(i, -1)}>↑</button>
                  <button type="button" aria-label="Move down" disabled={i === trip.length - 1} onClick={() => onMove(i, 1)}>↓</button>
                  <button type="button" aria-label={`Remove ${s.name}`} onClick={() => onRemove(s)}>✕</button>
                </span>
              </li>
            ))}
          </ol>
          <div className="trip-actions">
            <a className="btn" href={url} target="_blank" rel="noreferrer">Open route in Google Maps</a>
            <button type="button" className="btn btn-ghost" onClick={onOptimize} disabled={trip.length < 3}>Shortest order</button>
            <button type="button" className="btn btn-ghost" onClick={onClear}>Clear</button>
          </div>
          {trip.length > 11 && <p className="muted">Google Maps only takes the first 11 stops.</p>}
        </>
      )}
    </section>
  )
}
