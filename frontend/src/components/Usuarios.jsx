import {  Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material"
import React, { useEffect, useState } from "react"
import Topbar from "./Topbar";

function Usuarios () {

    const [item, setItem] = useState({nombre: '', login: '',password: '',rol: ''})
    const [tableData, setTableData] = useState({data: []})
    const [cont, setCont] = useState(0)

    useEffect(() => {
        if (cont === 0) {
            getUsuarios()
            setCont(1)
        }

        function getUsuarios() {
            fetch(`http://localhost:3030/usuarios/select`)
                .then(response=>response.json())
                .then(response=>{
                    setTableData(response)
            })
        }
    }, [cont,setCont,setTableData,tableData])

    function getUsuarios() {
        fetch(`http://localhost:3030/usuarios/select`)
                .then(response=>response.json())
                .then(response=>{
                    setTableData(response)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3030/usuarios/insert?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
            .then(response=>response.json())
            .then(response=>{
                try {
                    console.log()
                    if(response>0) {
                        alert("Datos guardados con éxito.")
                        setItem({nombre: '', login: '',password: '',rol: ''})
                        getUsuarios()
                    } else {
                        alert("Ha ocurrido un error. Los datos no se han guardado.")
                        console.log(response)
                    }
                } catch (e) {
                    alert("Ha ocurrido un error. Los datos no se han guardado.")
                    console.log(response)
                }
            })
    }

    return <>
        <Topbar></Topbar>

        <Paper sx={{"padding":"20px 20px 15px"}}>
            <Box component='form' autoComplete='off' onSubmit={handleSubmit} >
                <Grid container>
                    <Grid item xs={4} md={3}>
                        <TextField
                            label='Nombre'
                            required
                            sx={{"width":"90%","marginLeft":"5%"}}
                            value={item.nombre}
                            onChange={(event) => setItem({...item, nombre: event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <TextField
                            label='Login'
                            required
                            sx={{"width":"90%","marginLeft":"5%"}}
                            value={item.login}
                            onChange={(event) => setItem({...item, login : event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <TextField
                            label='Password'
                            required
                            sx={{"width":"90%","marginLeft":"5%"}}
                            value={item.password}
                            onChange={(event) => setItem({...item, password : event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <TextField
                            label='Rol'
                            required
                            sx={{"width":"90%","marginLeft":"5%"}}
                            value={item.rol}
                            onChange={(event) => setItem({...item, rol : event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Tooltip title="Insertar nuevo registro" arrow placement="bottom">
                        <Button variant="outlined" type="submit" sx={{"margin":"20px auto 0px"}}>+ Insertar datos</Button>
                    </Tooltip>
            </Grid>
            </Box>
        </Paper>

        <TableContainer>
            <Table aria-label='Nombre Tabla para accesibilidad'>
            <TableHead>
                <TableRow>
                    <TableCell><b>Nombre</b></TableCell>
                    <TableCell><b>Login</b></TableCell>
                    <TableCell><b>Password</b></TableCell>
                    <TableCell><b>Rol</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {console.log(tableData)}
                {
                tableData['data'].map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell>{row.login}</TableCell>
                        <TableCell>{row.password}</TableCell>
                        <TableCell>{row.rol}</TableCell>
                    </TableRow>
                ))
                }

            </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default Usuarios