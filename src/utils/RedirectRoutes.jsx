import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

const RedirectRoutes = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth)
    return (
        (auth && auth.accessToken) ? <Navigate to="/kanban/1" /> : <Outlet />
    )
}

export default RedirectRoutes