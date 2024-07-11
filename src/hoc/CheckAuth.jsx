import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const CheckAuth = () => {
    const authData = useSelector(state => state.auth)
    if (!authData.token) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}

export default CheckAuth