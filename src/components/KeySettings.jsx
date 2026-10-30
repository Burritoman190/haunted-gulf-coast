import { useState } from 'react'
import { MODELS, getApiKey, getModel, setApiKey, setModel } from '../lib/gemma.js'

export default function KeySettings({ onClose }) {
  const [key, setKey] = useState(getApiKey())
  const [model, setModelState] = useState(getModel())

  const save = () => {
    setApiKey(key)
    setModel(model)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-small" role="dialog" aria-modal="true" aria-label="Gemma settings" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
        <h2>🔮 Connect Gemma 4</h2>
        <p className="muted">
          Ghost scans use Google's open <strong>Gemma 4</strong> model through the free Gemini API tier.
        </p>
        <ol className="key-steps">
          <li>
            Get a free key at{' '}
            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">aistudio.google.com/apikey</a>. No billing is needed.
          </li>
          <li>Paste it below. It's saved only in this browser and sent only to Google.</li>
        </ol>
        <label className="field">
          <span>Gemini API key</span>
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="AIza…" autoComplete="off" spellCheck={false} />
        </label>
        <label className="field">
          <span>Model</span>
          <select value={model} onChange={(e) => setModelState(e.target.value)}>
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </label>
        <footer className="modal-actions">
          <button type="button" className="btn" onClick={save}>Save</button>
          {getApiKey() && (
            <button type="button" className="btn btn-ghost" onClick={() => { setApiKey(''); setKey('') }}>Remove key</button>
          )}
        </footer>
      </div>
    </div>
  )
}
