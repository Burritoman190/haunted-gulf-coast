export default function Passport({ entries, total, onClear, onSelect }) {
  const visited = new Set(entries.map((e) => e.locationId))
  const verified = new Set(entries.filter((e) => e.verified).map((e) => e.locationId))
  return (
    <section className="passport" aria-label="Haunted Passport">
      <div className="trip-head">
        <h2>🏅 Haunted Passport</h2>
        <span className="trip-stats">
          {visited.size}/{total} haunts · {verified.size} verified
        </span>
      </div>
      <div className="passport-bar" aria-hidden="true">
        <span style={{ width: `${(visited.size / total) * 100}%` }} />
      </div>
      {entries.length === 0 ? (
        <p className="muted">Tap 📸 Check in on a place to snap a photo and get a Gemma ghost scan.</p>
      ) : (
        <>
          <ul className="stamps">
            {[...entries].reverse().map((e) => (
              <li key={e.id}>
                <button type="button" className="stamp" onClick={() => onSelect(e.locationId)} title={e.reading?.reading || e.name}>
                  {e.thumb ? <img src={e.thumb} alt="" /> : <span className="stamp-ghost">👻</span>}
                  <span className="stamp-text">
                    <strong>{e.name}</strong>
                    <span>
                      {e.verified ? '📍 Verified' : 'Remote'} · {new Date(e.at).toLocaleDateString()}
                      {e.reading && ` · ${e.reading.spookLevel}/10`}
                    </span>
                    {e.reading && <em>“{e.reading.verdict}”</em>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="link-btn" onClick={onClear}>Clear passport</button>
        </>
      )}
    </section>
  )
}
