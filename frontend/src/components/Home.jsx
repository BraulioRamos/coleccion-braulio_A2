import { Button, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginActions } from '../store/storelogin';

function Home () {

    const userData = useSelector(state => state.login)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLogged = userData.isAutenticated

    useEffect(() => {
        if (!isLogged) {
            navigate('/')
        }
    }, [isLogged,navigate])

    function logOut() {
        dispatch(loginActions.logout({
        }))
    }

    console.log(userData)
    return <>
        <Typography variant="h1">Página home de Braulio Ramos De La Vega</Typography>
        <Typography variant="h2">Nombre usuario: {userData['userName']} | Rol: {userData['userRol']}</Typography>
        <Button variant="dark" onClick={logOut}>Salir</Button>
    </>
}

export default Home