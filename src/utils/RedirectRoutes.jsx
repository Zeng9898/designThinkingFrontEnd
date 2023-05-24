import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

const RedirectRoutes = () => {
    const { auth } = useContext(AuthContext);

    return (
        (auth && auth.accessToken) ? <Navigate to={`/kanban/${auth.kanbanId}`} /> : <Outlet />
    )
}

export default RedirectRoutes