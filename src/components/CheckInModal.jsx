import { useEffect, useRef, useState } from 'react'
import { prepareSnapshot } from '../lib/image.js'
import { getPosition, locationCheck } from '../lib/checkins.js'
import { ghostScan, demoReading, getApiKey } from '../lib/gemma.js'
import { canNarrate, speak, stopNarration } from '../lib/narrate.js'

const MATCH = { yes: '✅ Looks like the right place', maybe: '🤔 Could be the place', no: '❌ Doesn\'t look like this place' }

export default function CheckInModal({ location: loc, onClose, onSave, onOpenSettings }) {
  const [geo, setGeo] = useState({ state: 'idle' }) // idle | locating | done | error
  const [snapshot, setSnapshot] = useState(null)
  const [scan, setScan] = useState({ state: 'idle' }) // idle | scanning | done | error
  const [speaking, setSpeaking] = useState(false)
  const fileRef = useRef(null)
  const hasKey = !!getApiKey()

  const runLocation = async () => {
    setGeo({ state: 'locating' })
    try {
      const pos = await getPosition()
      setGeo({ state: 'done', ...locationCheck(loc, pos) })
    } catch (e) {
      setGeo({ state: 'error', message: e.message })
    }
  }

  useEffect(() => {
    runLocation()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      stopNarration()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setScan({ state: 'idle' })
    try {
      setSnapshot(await prepareSnapshot(file))
    } catch (err) {
      setScan({ state: 'error', message: err.message })
    }
  }

  const checkin = geo.state === 'done' ? { distance: geo.distance, verified: geo.verified } : { distance: null, verified: false }

  const runScan = async (demo = false) => {
    setScan({ state: 'scanning' })
    try {
      const result = demo ? demoReading(loc, checkin) : await ghostScan(loc, snapshot, checkin)
      setScan({ state: 'done', result })
    } catch (e) {
      setScan({ state: 'error', message: e.message })
    }
  }

  const save = () => {
    onSave({
      id: `${loc.id}-${Date.now()}`,
      locationId: loc.id,
      name: loc.name,
      at: new Date().toISOString(),
      verified: checkin.verified,
      distance: checkin.distance,
      thumb: snapshot?.thumb || null,
      reading: scan.state === 'done' ? scan.result : null,
    })
  }

  const r = scan.result
  const toggleSpeak = () => {
    if (speaking) {
      stopNarration()
      setSpeaking(false)
      return
    }
    setSpeaking(true)
    speak(`${r.verdict}. ${r.reading}`, { onEnd: () => setSpeaking(false) })
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={`Check in at ${loc.name}`} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
        <h2>📸 Ghost check-in</h2>
        <p className="modal-place">{loc.name}</p>

        {/* Step 1: location */}
        <section className="step">
          <h3><span className="step-num">1</span> Location check</h3>
          {geo.state === 'locating' && <p className="muted">Finding you…</p>}
          {geo.state === 'error' && (
            <p className="warn">
              {geo.message} <button type="button" className="link-btn" onClick={runLocation}>Retry</button>
            </p>
          )}
          {geo.state === 'done' &&
            (geo.verified ? (
              <p className="ok">📍 Verified on site: you're {geo.distance < 0.1 ? 'right here' : `${geo.distance.toFixed(2)} mi away`}.</p>
            ) : (
              <p className="warn">
                You're {geo.distance.toFixed(1)} mi away (on-site check-ins need to be within {geo.radius} mi). You can still do a{' '}
                <strong>remote</strong> ghost scan, but it won't get the verified badge.
              </p>
            ))}
        </section>

        {/* Step 2: snapshot */}
        <section className="step">
          <h3><span className="step-num">2</span> Snapshot</h3>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onFile} hidden />
          {snapshot ? (
            <div className="snapshot">
              <img src={snapshot.dataUrl} alt="Your snapshot" />
              <button type="button" className="btn btn-ghost" onClick={() => fileRef.current?.click()}>Retake</button>
            </div>
          ) : (
            <button type="button" className="btn" onClick={() => fileRef.current?.click()}>📷 Take or choose a photo</button>
          )}
        </section>

        {/* Step 3: Gemma scan */}
        <section className="step">
          <h3><span className="step-num">3</span> Gemma ghost scan</h3>
          {!hasKey && (
            <p className="muted">
              Gemma 4 needs a free Gemini API key. <button type="button" className="link-btn" onClick={onOpenSettings}>Add key</button> or try
              demo mode.
            </p>
          )}
          <div className="card-buttons">
            <button type="button" className="btn" disabled={!snapshot || !hasKey || scan.state === 'scanning'} onClick={() => runScan(false)}>
              {scan.state === 'scanning' ? 'Gemma is sensing spirits…' : '👁️ Scan with Gemma 4'}
            </button>
            <button type="button" className="btn btn-ghost" disabled={!snapshot || scan.state === 'scanning'} onClick={() => runScan(true)}>
              Demo mode
            </button>
          </div>
          {scan.state === 'scanning' && <div className="scanning" aria-hidden="true" />}
          {scan.state === 'error' && <p className="warn">{scan.message}</p>}
          {scan.state === 'done' && (
            <div className="reading">
              <p className="verdict">“{r.verdict}”</p>
              <div className="spook-bar" aria-label={`Spook level ${r.spookLevel} of 10`}>
                <span style={{ width: `${r.spookLevel * 10}%` }} />
              </div>
              <p className="muted small">Spook level {r.spookLevel}/10 · {MATCH[r.matchesPlace]}</p>
              <p>{r.reading}</p>
              {r.anomalies.length > 0 && (
                <ul className="anomalies">
                  {r.anomalies.map((a) => <li key={a}>👁️ {a}</li>)}
                </ul>
              )}
              <p className="muted small">I see: {r.seen}</p>
              <p className="muted small">Read by {r.model === 'demo' ? 'demo mode (no AI)' : r.model}</p>
              {canNarrate && (
                <button type="button" className={`btn btn-ghost${speaking ? ' speaking' : ''}`} onClick={toggleSpeak}>
                  {speaking ? '■ Stop' : '🔊 Hear the reading'}
                </button>
              )}
            </div>
          )}
        </section>

        <footer className="modal-actions">
          <button type="button" className="btn" disabled={!snapshot && geo.state !== 'done'} onClick={save}>
            {checkin.verified ? '🏅 Save verified check-in' : 'Save to passport'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}
