import React from 'react'
//import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {useState} from 'react'
import { Avatar, Container, Grid, Paper, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/storelogin';

function Login () {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [user,setUser] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user>'' && password>'') {
            fetch(`http://localhost:3030/login?user=${user}&password=${password}`)
            .then(response=>response.json())
            .then(response=>{
                if(response) {
                    if (response['data']['nombre'] == null) {
                        alert("Las credenciales son incorrectas")
                    } else {
                        console.log(response)
                        dispatch(loginActions.login({
                            name: response['data']['nombre'],
                            rol: response['data']['rol']
                        }))
                        navigate('/home')
                    }
                }
            })
        } else {
            alert("Es necesario introducir usuario y clave")
        }
    }

    return <>
        <Paper sx={{"padding":"20px 0px","margin":"10vh 30vw 0px"}} elevation={10}>
            <Container fixed>
                <Avatar sx={{"marginLeft":"auto","marginRight":"auto"}}></Avatar>
                <Typography variant='h5' sx={{"textAlign":"center","marginBottom":"15px"}}>Acceder</Typography>
                <Grid component="form" onSubmit={handleSubmit}>
                    <TextField 
                        id="user" 
                        variant="outlined" 
                        label="Usuario"
                        value={user}
                        onChange={(event) => setUser(event.target.value)}
                        sx={{"width":"90%","margin":"1vh 5%"}}
                    ></TextField><br/>
                    <TextField
                        type="password"
                        id="password"
                        variant="outlined"
                        label="Clave"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        sx={{"width":"90%","margin":"1vh 5%"}}
                    ></TextField><br/>
                    <Tooltip title="Iniciar sesión" arrow placement="bottom">
                        <Button variant="contained" type="submit" sx={{"width":"90%","margin":"1vh 5%"}}>Acceder</Button>
                    </Tooltip>
                </Grid>
            </Container>
        </Paper>
    </>
}

export default Login