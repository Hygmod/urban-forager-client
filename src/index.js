import React, { useMemo } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { AuthProvider } from "./context/AuthProvider"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserContext } from "./context/UserContext"



const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(



  <React.StrictMode>
    <BrowserRouter>

        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
)
