import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from "react-router-dom"
import { AppBar, Button, Container, Grid, Toolbar, Tooltip, Typography } from "@mui/material"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/storelogin';

function Topbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.login)

    function logOut() {
        dispatch(loginActions.logout({}))
    }

    const isLogged = userData.isAutenticated

    useEffect(() => {
        if (!isLogged) {
            navigate('/')
        }
    }, [isLogged,navigate])

    return <>
        <AppBar position='static'>
            <Container maxWidth={false}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={6} md={5} lg={3} sx={{"display":"inline-block"}}>
                            {(userData['userRol']==="user")?
                            <PersonIcon fontSize="large" sx={{"position":"relative","top":"17%"}}/>
                            :
                            <AdminPanelSettingsIcon fontSize="large" sx={{"position":"relative","top":"17%"}}/>
                            }
                            <Typography variant="h4" sx={{"display":"inline-block"}}>&nbsp;{userData['userName']}</Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Grid container sx={{"position":"relative","top":"15%"}}>
                                <Grid item xs={4} md={4} lg={2}>
                                    <Link to='/home'><Typography variant="h6">Inicio</Typography></Link>
                                </Grid>
                                {(userData['userRol']==="admin")&&
                                <Grid item xs={4} md={4} lg={2}>
                                    <Link to='/informes'><Typography variant="h6">Informes</Typography></Link>
                                </Grid>
                                }
                                <Grid item xs={4} md={4} lg={2}>
                                    <Link to='/Ramos_DeLaVega_Braulio_UT3A1.pdf' target='_blank'><Typography variant="h6" sx={{"marginLeft":"2vw"}}>Ayuda</Typography></Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} lg={2} sx={{"paddingBottom":"5px"}}>
                            <Tooltip title="Cerrar sesión" arrow placement='left'>
                                <Button variant="contained" onClick = {logOut} sx={{"float":"right","position":"relative","top":"5%"}}>Salir</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    </>
}

export default Topbar
