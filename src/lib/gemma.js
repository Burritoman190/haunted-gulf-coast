// Gemma 4 "ghost scan" through the free Gemini API tier.
// The visitor's own API key is stored only in their browser (localStorage) and sent straight to Google.

const KEY_STORE = 'haunted-gulf-coast:gemini-key'
const MODEL_STORE = 'haunted-gulf-coast:gemma-model'
const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models'

export const MODELS = [
  { id: 'gemma-4-26b-a4b-it', label: 'Gemma 4 26B A4B (fast)' },
  { id: 'gemma-4-31b-it', label: 'Gemma 4 31B (smarter, slower)' },
]

function read(key) {
  try {
    return localStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

function write(key, value) {
  try {
    if (value) localStorage.setItem(key, value)
    else localStorage.removeItem(key)
  } catch {
    // storage blocked; key just lasts for this page view
  }
}

let memoryKey = ''
export const getApiKey = () => read(KEY_STORE) || memoryKey
export const setApiKey = (k) => {
  memoryKey = k.trim()
  write(KEY_STORE, memoryKey)
}
export const getModel = () => read(MODEL_STORE) || MODELS[0].id
export const setModel = (m) => write(MODEL_STORE, m)

const SYSTEM = `You are "The Medium", the spooky paranormal investigator inside Haunted Gulf Coast,
a ghost-trip app for Southeast Texas and Southwest Louisiana. Visitors send you a photo they just took
at a reportedly haunted place. You look closely at the REAL contents of the photo and give a fun,
theatrical "paranormal reading" that ties what you actually see (shadows, doorways, windows, trees, light,
reflections, empty roads, people, sky) to the local legend. Stay playful and spooky, never gory.
Never claim ghosts are scientifically real. If the photo clearly does not match the place
(e.g. a selfie in a bedroom far from it), say so with humor. Keep it family-friendly.`

function buildPrompt(loc, checkin) {
  return `Place: ${loc.name} (${loc.address})
Legend: ${loc.story}
Location check: ${checkin.verified ? `verified on site (${checkin.distance.toFixed(2)} mi away)` : checkin.distance != null ? `NOT on site, ${checkin.distance.toFixed(1)} mi away` : 'location unknown'}

Look at the photo and reply with ONLY a JSON object, no markdown, in this exact shape:
{"seen":"one short sentence describing what is really in the photo",
 "matchesPlace":"yes" | "maybe" | "no",
 "spookLevel": integer 1-10,
 "anomalies":["up to 3 short things in the photo that a ghost hunter would point at"],
 "reading":"2-3 spooky sentences connecting the photo to the legend",
 "verdict":"a 2-5 word dramatic verdict"}`
}

function parseJson(text) {
  const cleaned = text.replace(/```(?:json)?/gi, '').trim()
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('Gemma did not return a reading. Try again.')
  return JSON.parse(cleaned.slice(start, end + 1))
}

function normalize(r) {
  const level = Math.max(1, Math.min(10, Math.round(Number(r.spookLevel) || 5)))
  return {
    seen: String(r.seen || ''),
    matchesPlace: ['yes', 'maybe', 'no'].includes(r.matchesPlace) ? r.matchesPlace : 'maybe',
    spookLevel: level,
    anomalies: Array.isArray(r.anomalies) ? r.anomalies.slice(0, 3).map(String) : [],
    reading: String(r.reading || ''),
    verdict: String(r.verdict || 'Something lingers'),
  }
}

async function callModel(model, key, loc, snapshot, checkin) {
  const res = await fetch(`${ENDPOINT}/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: snapshot.mimeType, data: snapshot.base64 } },
            { text: buildPrompt(loc, checkin) },
          ],
        },
      ],
      generationConfig: { temperature: 0.9, maxOutputTokens: 600, thinkingConfig: { thinkingLevel: 'minimal' } },
    }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const err = new Error(body?.error?.message || `Gemma request failed (${res.status})`)
    err.status = res.status
    throw err
  }
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => (p.thought ? '' : p.text || '')).join('') || ''
  return normalize(parseJson(text))
}

// Runs the scan with the chosen model, falling back to the other Gemma 4 size if it's unavailable or busy.
export async function ghostScan(loc, snapshot, checkin) {
  const key = getApiKey()
  if (!key) throw new Error('Add your free Gemini API key first.')
  const first = getModel()
  const order = [first, ...MODELS.map((m) => m.id).filter((id) => id !== first)]
  let lastErr
  for (const model of order) {
    try {
      const result = await callModel(model, key, loc, snapshot, checkin)
      return { ...result, model }
    } catch (e) {
      lastErr = e
      // Bad key / bad request won't be fixed by switching models
      if (e.status === 400 || e.status === 401 || e.status === 403) break
    }
  }
  throw lastErr
}

// Offline reading so the demo never breaks without a key or connection.
export function demoReading(loc, checkin) {
  const lines = [
    `The air feels heavier here. Something about ${loc.name} doesn't want to be photographed.`,
    `Look closely at the edges of the frame. Locals say ${loc.story.split('.')[0].toLowerCase()}.`,
  ]
  return {
    seen: 'Demo mode: Gemma did not look at this photo.',
    matchesPlace: checkin.verified ? 'yes' : 'maybe',
    spookLevel: Math.min(10, loc.fright * 2),
    anomalies: ['a shadow that is a little too dark', 'an unexplained cold spot'],
    reading: lines.join(' '),
    verdict: 'Presence suspected',
    model: 'demo',
  }
}
