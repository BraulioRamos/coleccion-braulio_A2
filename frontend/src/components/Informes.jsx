import { Button, Paper, Grid } from "@mui/material"
import Topbar from "./Topbar"
import InformeColeccion from "./InformeColeccion"
import { useState } from "react"

function Informes() {

    const [botonClick, setBotonClick] = useState(false)
    const [dbData, setDbData] = useState()
    const [dbFields, setDbFields] = useState()

    function getData() {
        fetch(`http://localhost:3030/select`)
                .then(response=>response.json())
                .then(response=>{
                    setTableData(response)
            })
        setBotonClick(true)
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

    return <>
        <Topbar></Topbar>

        <Paper sx={{"padding":"10px"}}>
            <Grid container>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={(event) => getData()} sx={{"margin":"auto","width":"100%"}} >INFORME COLECCIÓN</Button>
                </Grid>
            </Grid>
        </Paper>

        {(botonClick) &&
            <InformeColeccion data={dbData} fields={dbFields}/>
        }
    </>
}



export default Informes