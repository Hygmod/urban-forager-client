import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
        const navigate = useNavigate();
        const logout = useLogout()

    const signOut = async () => {
        await logout()
        navigate('/');
    }

    return (
        <section>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home