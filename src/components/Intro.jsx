import { useEffect, useState } from 'react'

// Full-screen fog intro shown on load; fades out when the visitor enters.
export default function Intro({ count, onEnter }) {
  const [leaving, setLeaving] = useState(false)

  const enter = () => {
    setLeaving(true)
    setTimeout(onEnter, 700)
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Enter' && enter()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`intro${leaving ? ' intro-leaving' : ''}`} role="dialog" aria-label="Welcome">
      <div className="fog fog-1" aria-hidden="true" />
      <div className="fog fog-2" aria-hidden="true" />
      <div className="fog fog-3" aria-hidden="true" />
      <div className="intro-moon" aria-hidden="true" />

      <div className="intro-content">
        <div className="intro-ghost" aria-hidden="true">👻</div>
        <h1 className="flicker">Haunted Gulf Coast</h1>
        <p className="intro-sub">
          {count} reportedly haunted places, whispered rumors &amp; ghost tours
          <br />
          Beaumont · Bridge City &amp; Orange · Port Arthur · Lake Charles
        </p>
        <button type="button" className="btn intro-btn" onClick={enter} autoFocus>
          Enter if you dare
        </button>
        <p className="intro-note">Stories are folklore. Respect private property &amp; posted hours.</p>
      </div>
    </div>
  )
}
