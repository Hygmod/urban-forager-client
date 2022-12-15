import { Outlet } from "react-router-dom"
import Home from "./Home"

const LayoutWithoutLogout = () => {
    return (
        <main className="App">
            <Outlet />
          
        </main>
    )
}

export default LayoutWithoutLogout