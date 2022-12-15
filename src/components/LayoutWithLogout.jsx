import { Outlet } from "react-router-dom"
import Home from "./Home"

const LayoutWithLogout = () => {
    return (
        <main className="App">
            <Outlet />
            <Home />
        </main>
    )
}

export default LayoutWithLogout