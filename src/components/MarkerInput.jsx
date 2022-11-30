import React from "react"
import { useState } from "react"
import axios from "../api/axios"
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
    const routeMarkers = "/markers"
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
      <form>
        <label htmlFor="latLng">Lat Lng:</label>
        <input id="latLng" type="text" value={latLng} onChange={(e) => setLatLng(e.target.value)}></input>
        <label htmlFor="type">Type:</label>
        <Dropdown id="type" isMulti={false} dropdownOptions={props.dropdownOptions} onChange={handleMarkerInput} />
        <button className="btn" onClick={saveData}>
          Save
        </button>
      </form>
    </div>
  )
}

export default MarkerInput
