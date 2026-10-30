import { distanceMi } from './trip.js'

const STORE = 'haunted-gulf-coast:passport'

// How close you must be to count as "on site". Roads, beaches and landmarks are spread out.
export function checkInRadiusMi(loc) {
  return ['road', 'landmark'].includes(loc.category) ? 2 : 0.5
}

export function getPosition() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Location is not available in this browser.'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracyM: pos.coords.accuracy }),
      () => reject(new Error("Couldn't get your location. Allow location access and try again.")),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    )
  })
}

export function locationCheck(loc, pos) {
  const distance = distanceMi(pos, loc)
  return { distance, verified: distance <= checkInRadiusMi(loc), radius: checkInRadiusMi(loc) }
}

export function loadPassport() {
  try {
    return JSON.parse(localStorage.getItem(STORE) || '[]')
  } catch {
    return []
  }
}

export function savePassport(entries) {
  try {
    localStorage.setItem(STORE, JSON.stringify(entries))
    return true
  } catch {
    // Quota full: drop the oldest thumbnails and try once more
    try {
      localStorage.setItem(STORE, JSON.stringify(entries.map((e, i) => (i < entries.length - 10 ? { ...e, thumb: null } : e))))
      return true
    } catch {
      return false
    }
  }
}
