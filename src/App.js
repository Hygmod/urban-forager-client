import "./App.css"
import Map from "./components/Map"
import Signup from "./components/Signup"
import Login from "./components/Login"
import LayoutWithoutLogout from "./components/LayoutWithoutLogout"
import LayoutWithLogout from "./components/LayoutWithLogout"
import Missing from "./components/Missing"
import RequireAuth from "./components/RequireAuth"
import PersistLogin from "./components/PersistLogin"
import { Routes, Route } from "react-router-dom"
import { useMemo, useState } from "react"
import { UserContext } from "./context/UserContext"

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}

function App() {
  const [userId, setUserId] = useState("")
  const user_id = useMemo(() => ({ userId, setUserId }), [userId, setUserId])

  return (
    <UserContext.Provider value={user_id}>
      <Routes>
        <Route element={<LayoutWithoutLogout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route element={<LayoutWithLogout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Map />}></Route>
              <Route path="markers"></Route>
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
