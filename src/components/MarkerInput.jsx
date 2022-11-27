import React from "react"
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import Dropdown from "./Dropdown"

const MarkerInput = (props) => {
  const [latLng, setLatLng] = useState("")
  const [markerType, setMarkerType] = useState("")

  const handleMarkerInput = (value) => {
    setMarkerType(value?.value)
  }

  useEffect(() => {
    if (props.mapClick) {
      console.log(props.mapClick)
      setLatLng(`${JSON.parse(props.mapClick).lat} ${JSON.parse(props.mapClick).lng}`)
    }
  }, [props])

  const saveData = () => {
    const routeMarkers = process.env.REACT_APP_MODE === "production" ? "https://urban-forager.onrender.com/markers" : "http://localhost:3500/markers"
    const data = {
      lat: latLng.split(" ")[0],
      lng: latLng.split(" ")[1],
      markerType: markerType,
    }
    axios.post(routeMarkers, data)
    axios.get(routeMarkers).then((res) => props.updateMarkerCount(res.data.length))
  }

  return (
    <div>
      <label>Lat Lng:</label>
      <input type="text" value={latLng} onChange={(e) => setLatLng(e.target.value)}></input>
      <label>Type:</label>
      <Dropdown isMulti={false} dropdownOptions={props.dropdownOptions} onChange={handleMarkerInput} />
      <button onClick={saveData}>Save</button>
    </div>
  )
}

export default MarkerInput
