// Reads text aloud with the browser's built-in Web Speech API (no keys, no server).

export const canNarrate = typeof window !== 'undefined' && 'speechSynthesis' in window

function pickVoice() {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'))
  // Prefer a deeper / more natural voice when one exists
  return (
    voices.find((v) => /david|guy|daniel|george|male/i.test(v.name)) ||
    voices.find((v) => /natural|online/i.test(v.name)) ||
    voices[0]
  )
}

export function speak(text, { onEnd } = {}) {
  if (!canNarrate) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const voice = pickVoice()
  if (voice) u.voice = voice
  u.rate = 0.9
  u.pitch = 0.8
  u.onend = onEnd
  u.onerror = onEnd
  window.speechSynthesis.speak(u)
}

export function narrate(loc, opts) {
  speak(`${loc.name}. ${loc.story} Visitor tip: ${loc.tip}`, opts)
}

export function stopNarration() {
  if (canNarrate) window.speechSynthesis.cancel()
}
