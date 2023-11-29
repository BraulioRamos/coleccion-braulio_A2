import { Button, Paper, Grid, Tooltip } from "@mui/material"
import Topbar from "./Topbar"
import InformeColeccion from "./InformeColeccion"
import InformeUsuarios from "./InformeUsuarios"
import { useState } from "react"

function Informes() {

    const [botonClick, setBotonClick] = useState(false)
    const [botonUsuariosClick, setBotonUsuariosClick] = useState(false)
    const [dbData, setDbData] = useState()
    const [dbFields, setDbFields] = useState()
    const [usuariosData, setUsuariosData] = useState()
    const [usuariosFields, setUsuariosFields] = useState()

    function getData() {
        fetch(`http://localhost:3030/select`)
                .then(response=>response.json())
                .then(response=>{
                    setTableData(response)
            })
        setBotonClick(true)
    }

    function getDataUsuarios() {
        fetch('http://localhost:3030/usuarios/select')
            .then(response=>response.json())
            .then(response=>{
                setTableUsuariosData(response)
            })
        setBotonUsuariosClick(true)
    }

    function setTableData(data) {
        setDbFields([
            {title: "Nombre", field: "nombre", filtering: false},
            {title: "Marca", field: "marca", filtering: false},
            {title: "Tipo", field: "tipo"},
            {title: "Precio", field: "precio"}
        ])

        let dataArray = []
        for (let row of data['data']) {
            dataArray.push({
                "nombre": row['nombre'], "marca": row['marca'],
                "tipo": row["tipo"], "precio": row["precio"]
            })
        }
        
        setDbData(dataArray)
    }

    function setTableUsuariosData(data) {
        setUsuariosFields([
            {title: "Nombre", field: "nombre"},
            {title: "Login", field: "login", filtering: false},
            {title: "Password", field: "password",filtering: false},
            {title: "Rol", field: "rol",filtering: false}
        ])

        let dataArray = []
        for (let row of data['data']) {
            dataArray.push({
                "nombre": row['nombre'], "login": row['login'],
                "password": row["password"], "rol": row["rol"]
            })
        }
        
        setUsuariosData(dataArray)
    }

    return <>
        <Topbar></Topbar>

        <Paper sx={{"padding":"10px"}}>
            <Grid container>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <Tooltip title="Generar informe" arrow placement="right-end">
                        <Button variant="contained" onClick={(event) => getData()} sx={{"margin":"auto","width":"100%"}} >INFORME COLECCIÓN</Button>
                    </Tooltip>
                    
                </Grid>
            </Grid>
        </Paper>

        {(botonClick) &&
            <InformeColeccion data={dbData} fields={dbFields}/>
        }

        <Paper sx={{"padding":"10px"}}>
            <Grid container>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <Tooltip title="Generar informe usuarios" arrow placement="right-end">
                        <Button variant="contained" onClick={(event) => getDataUsuarios()} sx={{"margin":"auto","width":"100%"}} >INFORME USUARIOS</Button>
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>

        {(botonUsuariosClick) &&
            <InformeUsuarios data={usuariosData} fields={usuariosFields}/>
        }
    </>
}

export default Informes