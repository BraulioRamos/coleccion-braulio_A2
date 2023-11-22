import {  Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Topbar from "./Topbar";

function Home () {

    const [item, setItem] = useState({nombre: '', marca: '',precio: '',tipo: ''})
    const userData = useSelector(state => state.login)
    const [tableData, setTableData] = useState({data: []})
    const [cont, setCont] = useState(0)

    useEffect(() => {
        if (cont === 0) {
            getProductos()
            setCont(1)
        }

        function getProductos() {
            fetch(`http://localhost:3030/select`)
                .then(response=>response.json())
                .then(response=>{
                    setTableData(response)
            })
        }
    }, [cont,setCont,setTableData,tableData])

    function getProductos() {
        fetch(`http://localhost:3030/select`)
                .then(response=>response.json())
                .then(response=>{
                    setTableData(response)
            })
    }

    function deleteProduct(element) {
        let id
        if (element.nodeName==="path") {
            id = element.parentElement.getAttribute('data-id')
        } else {
            id = element.getAttribute('data-id')
        }
        
        fetch(`http://localhost:3030/delete?id=${id}`)
                .then(response=>response.json())
                .then(response=>{
                    try {
                        if(response>0) {
                            alert("Registro eliminado.")
                        } else {
                            alert("Ha ocurrido un error. El registro no se ha eliminado.")
                            console.log(response)
                        }
                    } catch (e) {
                        alert("Ha ocurrido un error. El registro no se ha eliminado.")
                        console.log(response)
                    }
                    getProductos()
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3030/insert?nombre=${item.nombre}&marca=${item.marca}&precio=${item.precio}&tipo=${item.tipo}`)
            .then(response=>response.json())
            .then(response=>{
                try {
                    console.log()
                    if(response>0) {
                        alert("Datos guardados con éxito.")
                        setItem({nombre: '', marca: '',precio: '',tipo: ''})
                        getProductos()
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
                            label='Marca'
                            required
                            sx={{"width":"90%","marginLeft":"5%"}}
                            value={item.marca}
                            onChange={(event) => setItem({...item, marca : event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <TextField
                            label='Tipo'
                            required
                            sx={{"width":"90%","marginLeft":"5%"}}
                            value={item.tipo}
                            onChange={(event) => setItem({...item, tipo : event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <TextField
                            label='Precio'
                            required
                            sx={{"width":"90%","marginLeft":"5%"}}
                            value={item.precio}
                            onChange={(event) => setItem({...item, precio : event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Button variant="outlined" type="submit" sx={{"margin":"20px auto 0px"}}>+ Insertar datos</Button>
            </Grid>
            </Box>
        </Paper>

        <TableContainer>
            <Table aria-label='Nombre Tabla para accesibilidad'>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Precio</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {console.log(tableData)}
                {
                tableData['data'].map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>
                            {(userData['userRol']==="admin")&&
                            <Button data-id={row.id} onClick={(event) => deleteProduct(event.target)}>
                                <DeleteForeverIcon data-id={row.id} />
                            </Button>
                            }
                        </TableCell>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell>{row.marca}</TableCell>
                        <TableCell>{row.tipo}</TableCell>
                        <TableCell>{row.precio}</TableCell>
                    </TableRow>
                ))
                }

            </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default Home