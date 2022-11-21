import React from "react"
import { useMemo, useEffect, useState } from "react"
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api"
import axios from "axios"
import MarkerInput from "./MarkerInput"
import icon from './ylw-pushpin-icon.png'

const containerStyle = {
  width: "100vw",
  height: "60vw",
}

const Map = () => {
  const [marker, setMarker] = useState([])
  const [mapClick, setMapClick] = useState(null)
  const [markerCount, setMarkerCount] = useState(0)
  const [tempMarker, setTempMarker] = useState(null)

  useEffect(() => {
    const routeMarkers = process.env.REACT_APP_MODE === "production" ? "https://urban-forager.onrender.com/markers" : "http://localhost:3500/markers"
    axios.get(routeMarkers).then((res) => setMarker(res.data))
  }, [markerCount])

  const handleMarkerCount = (count) => {
    setMarkerCount(count)
  }

  useEffect(() => {
    const vallombrosaAtMangrove = { lat: 39.734033, lng: -121.835557 }
    setTempMarker(mapClick ? JSON.parse(mapClick) : vallombrosaAtMangrove)
  }, [mapClick])

  const center = useMemo(() => ({ lat: 39.730156, lng: -121.834401 }), [])

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      { elementType: "labels", stylers: [{ visibility: "off" }] },
      { elementType: "labels", featureType: "road", stylers: [{ visibility: "on" }] },
    ],
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={mapOptions}
        onClick={(e) => {
          setMapClick(JSON.stringify(e.latLng.toJSON()))
        }}
      >
        <MarkerF position={tempMarker} icon={icon} />

        {marker.map((e, i) => (
          <MarkerF key={i} position={{ lat: Number(e.lat), lng: Number(e.lng) }} />
         
        ))}

        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
      <h4>{mapClick}</h4>
      <MarkerInput mapClick={mapClick} updateMarkerCount={handleMarkerCount} />
    </LoadScript>
  )
}

export default Map
