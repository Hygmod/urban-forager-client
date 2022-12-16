import React from "react"
import { useMemo, useEffect, useState } from "react"
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api"
import { useNavigate, useLocation } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import MarkerInput from "./MarkerInput"
import "../App.css"
import Filter from "./Filter"

import ylwPushpinIcon from "./markerIcons/ylw-pushpin-icon.png"
import bayleaf from "./markerIcons/bayleaf.png"
import lemon from "./markerIcons/lemon.png"
import lime from "./markerIcons/lime.png"
import orange from "./markerIcons/orange.png"
import persimmon from "./markerIcons/persimmon.png"
import pineappleguava from "./markerIcons/pineappleguava.png"
import rosemary from "./markerIcons/rosemary.png"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Map = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const axiosPrivate = useAxiosPrivate()
  const [marker, setMarker] = useState([])
  const [allMarkers, setAllMarkers] = useState([])
  const [mapClick, setMapClick] = useState(null)
  const [markerCount, setMarkerCount] = useState(0)
  const [tempMarker, setTempMarker] = useState(null)
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState(null)
  const [filter, setFilter] = useState([])
  const [markerTypeOptions, setMarkerTypeOptions] = useState([])
  const [center, setCenter] = useState({ lat: 39.730156, lng: -121.834401 })
  const [markerIcons, setMarkerIcons] = useState({ bayleaf: bayleaf, lemon: lemon, lime: lime, orange: orange, persimmon: persimmon, pineappleguava: pineappleguava, rosemary: rosemary })

  const {userId} = useContext(UserContext)

  useEffect(() => {
    let isMounted = true
    // const controller = new AbortController()

      const getMarkers = async () => {
      try {
        const res = await axiosPrivate.get("/markers",{ params: { user: userId } }
        // , {
        //   signal: controller.signal,
        // }
        )
        const filteredMarkers = filter?.length ? res.data.filter((e) => filter.includes(e.markerType)) : res.data
        isMounted && setMarker(filteredMarkers)
        isMounted && setAllMarkers(res.data)

        const createDropdownOptions = () => {
          const values = res.data
            .map((e) => e.markerType)
            .sort()
            .reverse()
          return [...new Set(values)].map((e) => ({ value: e, label: e }))
        }
        setMarkerTypeOptions(createDropdownOptions)
      } catch (err) {
        console.error(err)
        navigate("/login", { state: { from: location }, replace: true })
      }
    }
    getMarkers()
    return () => {
      isMounted = false
    }
  }, [markerCount])

  useEffect(() => {
    const filteredMarkers = filter?.length ? allMarkers.filter((e) => filter.includes(e.markerType)) : allMarkers
    setMarker(filteredMarkers)

    const averageLat = Number(filteredMarkers.reduce((a, c) => Number(c.lat) + a, 0) / filteredMarkers.length)
    const averageLng = Number(filteredMarkers.reduce((a, c) => Number(c.lng) + a, 0) / filteredMarkers.length)
    filter.length ? setCenter({ lat: averageLat, lng: averageLng }) : setCenter({ lat: 39.730156, lng: -121.834401 })
  }, [filter])

  useEffect(() => {
    const vallombrosaAtMangrove = { lat: 39.734033, lng: -121.835557 }
    setTempMarker(mapClick ? JSON.parse(mapClick) : vallombrosaAtMangrove)
  }, [mapClick])

  //map options and defaults
  // const center = useMemo(() => ({ lat: 39.730156, lng: -121.834401 }), [])

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

  const handleIcon = (e) => {
    //TODO: the icons are showing properly when filtered, changing them to default markers until I can revisit this
    // return markerIcons[e]
    return ''
    
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
          <MarkerF position={tempMarker} icon={ylwPushpinIcon} />

          {marker.map((e, i) => {
            return (
              <div key={i}>
                <MarkerF key={`marker${i}`} icon={handleIcon(e.markerType)} position={{ lat: Number(e.lat), lng: Number(e.lng) }} onClick={() => onMarkerClick(i)} />

                {showInfoWindow && activeMarker === i && (
                  <InfoWindowF key={`infoWondow${i}`} options={{ pixelOffset: new window.google.maps.Size(0, -20) }} position={{ lat: Number(e.lat), lng: Number(e.lng) }} onCloseClick={onInfoWindowCloseClick}>
                    <div style={infoWindowStyle}>
                      <h4> {e.markerType}</h4>
                    </div>
                  </InfoWindowF>
                )}
              </div>
            )
          })}

          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
        <MarkerInput className="marker-input" mapClick={mapClick} updateMarkerCount={handleMarkerCount} dropdownOptions={markerTypeOptions} />

        <Filter className="filter" dropdownOptions={markerTypeOptions} handleFilter={handleFilter} />
      </LoadScript>
    </div>
  )
}

export default Map
