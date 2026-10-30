const EARTH_RADIUS_MI = 3958.8

// Straight-line distance in miles between two {lat, lng} points.
export function distanceMi(a, b) {
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.sqrt(h))
}

// Greedy nearest-neighbour ordering starting from the first stop.
// Good enough for a handful of stops; not a true shortest route.
export function optimizeOrder(stops) {
  if (stops.length < 3) return stops
  const remaining = stops.slice(1)
  const ordered = [stops[0]]
  while (remaining.length) {
    const last = ordered[ordered.length - 1]
    let best = 0
    for (let i = 1; i < remaining.length; i++) {
      if (distanceMi(last, remaining[i]) < distanceMi(last, remaining[best])) best = i
    }
    ordered.push(remaining.splice(best, 1)[0])
  }
  return ordered
}

export function totalMiles(stops) {
  let sum = 0
  for (let i = 1; i < stops.length; i++) sum += distanceMi(stops[i - 1], stops[i])
  return sum
}

// Google Maps directions link (supports up to 9 waypoints between origin and destination).
export function directionsUrl(stops) {
  if (!stops.length) return null
  const pt = (s) => `${s.lat},${s.lng}`
  const params = new URLSearchParams({ api: '1', travelmode: 'driving' })
  if (stops.length === 1) {
    params.set('destination', pt(stops[0]))
  } else {
    params.set('origin', pt(stops[0]))
    params.set('destination', pt(stops[stops.length - 1]))
    const middle = stops.slice(1, -1).slice(0, 9)
    if (middle.length) params.set('waypoints', middle.map(pt).join('|'))
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`
}
