import "./App.css"
import Map from "./components/Map"


import Signup from "./components/Signup"
import Login from "./components/Login"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import RequireAuth from "./components/RequireAuth"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route element={<RequireAuth />}>
        <Route path="/" element={<Map />}></Route>
        <Route path="/markers" element={<Map />}></Route>
      </Route>

      {/* catch all */}
      <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
