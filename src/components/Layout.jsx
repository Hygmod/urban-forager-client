import { Outlet } from "react-router-dom"
import Home from "./Home"

const Layout = () => {
    return (
        <main className="App">
            <Outlet />
            <Home />
        </main>
    )
}

export default Layout