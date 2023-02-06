import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { NewContext } from '../../Context/Context';

const PublicRoute = () => {

    const { isAuthenticated } = useContext(NewContext);

    if(isAuthenticated) {
        return <Navigate to='/admin/home' />
    }


  return (
    <Outlet />
  )
}

export default PublicRoute
