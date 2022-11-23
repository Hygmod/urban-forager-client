import React from "react"
import { useMemo, useEffect, useState } from "react"
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api"
import axios from "axios"
import MarkerInput from "./MarkerInput"
import icon from "./ylw-pushpin-icon.png"
import "../App.css"

const Map = () => {
  const [marker, setMarker] = useState([])
  const [mapClick, setMapClick] = useState(null)
  const [markerCount, setMarkerCount] = useState(0)
  const [tempMarker, setTempMarker] = useState(null)
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState(null)

  useEffect(() => {
    const routeMarkers = process.env.REACT_APP_MODE === "production" ? "https://urban-forager.onrender.com/markers" : "http://localhost:3500/markers"
    axios.get(routeMarkers).then((res) => setMarker(res.data))
  }, [markerCount])

  const handleMarkerCount = (count) => {
    setMarkerCount(count)
  }

  const containerStyle = {
    width: "100vw",
    height: "60vh",
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

  const infoWindowStyle = {
    background: `white`,
    border: `1px solid #000`,
    padding: 5,
  }

  const onMarkerClick = (i) => {
    setActiveMarker(i)
    setShowInfoWindow(!showInfoWindow)
  }
  const onInfoWindowCloseClick = (i) => {
    setShowInfoWindow(!showInfoWindow)
  }

  const createDropdownOptions = () => {
    const values = marker
      .map((e) => e.markerType)
      .sort()
      .reverse()
    return [...new Set(values)].map((e) => ({ value: e, label: e }))
  }

  const dropdownOptions = createDropdownOptions()

const divStyle = {
  width: "100vw",
  height: "100vh",
}

  return (
<div style={divStyle}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          id="map"
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
            <div key={i}>
              <MarkerF key={`marker${i}`} position={{ lat: Number(e.lat), lng: Number(e.lng) }} onClick={() => onMarkerClick(i)} />
              {showInfoWindow && activeMarker === i && (
                <InfoWindowF key={`infoWondow${i}`} options={{ pixelOffset: new window.google.maps.Size(0, -20) }} position={{ lat: Number(e.lat), lng: Number(e.lng) }} onCloseClick={onInfoWindowCloseClick}>
                  <div style={infoWindowStyle}>
                    <h3> {e.markerType}</h3>
                  </div>
                </InfoWindowF>
              )}
            </div>
          ))}

          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
        <h4>{mapClick}</h4>
        <MarkerInput mapClick={mapClick} updateMarkerCount={handleMarkerCount} dropdownOptions={dropdownOptions} />
      </LoadScript>
      </div>
  )
}

export default Map
