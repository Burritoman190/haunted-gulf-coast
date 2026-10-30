import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import { CATEGORIES } from '../data/locations.js'

function pinIcon(location, { selected, tripIndex }) {
  const badge = tripIndex >= 0 ? `<span class="pin-badge">${tripIndex + 1}</span>` : ''
  return L.divIcon({
    className: '',
    html: `<div class="pin pin-${location.lore}${selected ? ' pin-selected' : ''}">${CATEGORIES[location.category].icon}${badge}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  })
}

function clusterIcon(cluster) {
  return L.divIcon({
    className: '',
    html: `<div class="cluster"><span>👻</span><b>${cluster.getChildCount()}</b></div>`,
    iconSize: [44, 44],
  })
}

// Re-frames the map whenever the visible set of locations changes.
function FitBounds({ locations }) {
  const map = useMap()
  const key = locations.map((l) => l.id).join(',')
  useEffect(() => {
    // Container may have been laid out after Leaflet measured it
    map.invalidateSize()
    if (!locations.length) return
    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]))
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map])
  return null
}

function FlyTo({ location }) {
  const map = useMap()
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lng], Math.max(map.getZoom(), 15), { duration: 0.6 })
  }, [location, map])
  return null
}

export default function MapView({ locations, selected, onSelect, trip, userPos }) {
  const tripIds = trip.map((t) => t.id)
  return (
    <MapContainer center={[30.05, -93.7]} zoom={9} className="map" scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="dark-tiles"
      />
      <FitBounds locations={locations} />
      <FlyTo location={selected} />
      {trip.length > 1 && (
        <Polyline
          positions={trip.map((t) => [t.lat, t.lng])}
          pathOptions={{ color: '#ff8a3d', weight: 3, dashArray: '8 10', className: 'route-line' }}
        />
      )}
      {userPos && (
        <CircleMarker center={[userPos.lat, userPos.lng]} radius={9} pathOptions={{ color: '#4fc3ff', fillColor: '#4fc3ff', fillOpacity: 0.8, className: 'you-are-here' }}>
          <Popup>You are here</Popup>
        </CircleMarker>
      )}
      <MarkerClusterGroup iconCreateFunction={clusterIcon} maxClusterRadius={40} showCoverageOnHover={false} spiderfyOnMaxZoom>
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={pinIcon(loc, { selected: selected?.id === loc.id, tripIndex: tripIds.indexOf(loc.id) })}
            eventHandlers={{ click: () => onSelect(loc) }}
          >
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              {'👻'.repeat(loc.fright)}
              <br />
              {loc.address}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
