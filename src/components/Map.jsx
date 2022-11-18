import React from "react"
import { useMemo, useEffect, useState } from "react"
import { GoogleMap, LoadScript, useLoadScript, MarkerF } from "@react-google-maps/api"
import axios from "axios"
import MarkerInput from "./MarkerInput"

const containerStyle = {
  width: "90vw",
  height: "60vw",
}

const Map = () => {
  const [marker, setMarker] = useState([])
  const [mapClick, setMapClick] = useState(null)
  const [markerCount, setMarkerCount] = useState(0)
  const [tempMarker, setTempMarker] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:3500/markers").then((res) => setMarker(res.data))
  }, [markerCount])

  const handlemarkerCount = (count) => {
    setMarkerCount(count)
  }

  useEffect(() => {
    console.log(mapClick)
    setTempMarker(mapClick ? JSON.parse(mapClick) : { lat: 39.734033, lng: -121.835557 })
  }, [mapClick])

  const center = useMemo(() => ({ lat: 39.730156, lng: -121.834401 }), [])
  const vallombrosaAtMangrove = { lat: 39.734033, lng: -121.835557 }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onClick={(e) => {
          setMapClick(JSON.stringify(e.latLng.toJSON()))
        }}
      >
        <MarkerF position={tempMarker} />

        {marker.map((e, i) => {
          return <MarkerF key={i} position={{ lat: Number(e.lat), lng: Number(e.lng) }} />
        })}

        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
      <h4>{mapClick}</h4>
      <MarkerInput mapClick={mapClick} updateMarkerCount={handlemarkerCount} />
    </LoadScript>
  )
}

export default Map
