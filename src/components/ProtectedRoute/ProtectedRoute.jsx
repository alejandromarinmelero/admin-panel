import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { NewContext } from '../../Context/Context'

const ProtectedRoute = () => {

    const { isAuthenticated } = useContext(NewContext);

    if (!isAuthenticated) {
        return <Navigate to='/'/>
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute
