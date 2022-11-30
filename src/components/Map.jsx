import React from "react"
import { useMemo, useEffect, useState } from "react"
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api"
import axios from "../api/axios"
import MarkerInput from "./MarkerInput"
import icon from "./ylw-pushpin-icon.png"
import "../App.css"
import Filter from "./Filter"

const Map = () => {
  const [marker, setMarker] = useState([])
  const [allMarkers, setAllMarkers] = useState([])
  const [mapClick, setMapClick] = useState(null)
  const [markerCount, setMarkerCount] = useState(0)
  const [tempMarker, setTempMarker] = useState(null)
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState(null)
  const [filter, setFilter] = useState([])
  const [markerTypeOptions, setMarkerTypeOptions] = useState([])

  useEffect(() => {
    const routeMarkers = "/markers"
    axios.get(routeMarkers).then((res) => {
      const filteredMarkers = filter?.length ? res.data.filter((e) => filter.includes(e.markerType)) : res.data
      setMarker(filteredMarkers)
      setAllMarkers(res.data)
    })
  }, [markerCount, filter])

  useEffect(() => {
    const createDropdownOptions = () => {
      const values = allMarkers
        .map((e) => e.markerType)
        .sort()
        .reverse()
      return [...new Set(values)].map((e) => ({ value: e, label: e }))
    }

    const dropdownOptions = createDropdownOptions()
    setMarkerTypeOptions(dropdownOptions)
  }, [allMarkers])

  useEffect(() => {
    const vallombrosaAtMangrove = { lat: 39.734033, lng: -121.835557 }
    setTempMarker(mapClick ? JSON.parse(mapClick) : vallombrosaAtMangrove)
  }, [mapClick])

  //map options and defaults
  const center = useMemo(() => ({ lat: 39.730156, lng: -121.834401 }), [])

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      { elementType: "labels", stylers: [{ visibility: "off" }] },
      { elementType: "labels", featureType: "road", stylers: [{ visibility: "on" }] },
    ],
  }

  //Styling
  const containerStyle = {
    width: "100vw",
    height: "60vh",
  }
  const infoWindowStyle = {
    background: `white`,
    border: `1px solid #000`,
    padding: 5,
  }
  const divStyle = {
    width: "100vw",
    height: "100vh",
  }

  //prop functions and handlers
  const onMarkerClick = (i) => {
    setActiveMarker(i)
    setShowInfoWindow(!showInfoWindow)
  }
  const onInfoWindowCloseClick = (i) => {
    setShowInfoWindow(!showInfoWindow)
  }

  const handleMarkerCount = (count) => {
    setMarkerCount(count)
  }
  const handleFilter = (value) => {
    setFilter(value.map((e) => e.value))
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
                    <h4> {e.markerType}</h4>
                  </div>
                </InfoWindowF>
              )}
            </div>
          ))}

          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
        <MarkerInput className="marker-input" mapClick={mapClick} updateMarkerCount={handleMarkerCount} dropdownOptions={markerTypeOptions} />

        <Filter className="filter" dropdownOptions={markerTypeOptions} handleFilter={handleFilter} />
      </LoadScript>
    </div>
  )
}

export default Map
