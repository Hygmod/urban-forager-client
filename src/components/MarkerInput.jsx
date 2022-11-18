import React from "react"
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

const MarkerInput = (props) => {
  const [latLng, setLatLng] = useState("")
  const [markerType, setMarkerType] = useState("")



  useEffect(() => {
    if (props.mapClick) {
      setLatLng(`${JSON.parse(props.mapClick).lat} ${JSON.parse(props.mapClick).lng}`)
    }
  }, [props])

  const saveData = () => {
    const data = {
      lat: latLng.split(" ")[0],
      lng: latLng.split(" ")[1],
      markerType: markerType,
    }
    axios.post("http://localhost:3500/markers", data)
    axios.get("http://localhost:3500/markers").then((res) => props.updateMarkerCount(res.data.length))
  }

  return (
    <div>
      <h3>MarkerInput</h3>
      <label>Lat Lng:</label>
      <input type="text" value={latLng} onChange={(e) => setLatLng(e.target.value)}></input>
      <label>Type:</label>
      <input type="text" onChange={(e) => setMarkerType(e.target.value)}></input>
      <button onClick={saveData}>Save</button>
    </div>
  )
}

export default MarkerInput
