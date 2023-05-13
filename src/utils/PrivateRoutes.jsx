import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

const PrivateRoutes = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth)
    return (
        (auth && auth.accessToken) ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes