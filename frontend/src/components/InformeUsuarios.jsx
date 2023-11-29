import MaterialTable from "@material-table/core"
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeUsuarios(props) {

    return (<>
        <MaterialTable 
            columns={props.fields} data={props.data}
            title={"Informe Usuarios"}
            options={{
                exportMenu: [
                    {
                        label:"Exportar PDF",
                        exportFunc: (col, data) => ExportPdf(col,data,"InformeUsuarios.pdf")
                    },
                    {
                        label: "Exportar CSV",
                        exportFunc: (col,data) => ExportCsv(col,data,"InformeUsuarios.csv")
                    }
                ],
                draggable: true,
                headerStyle: {
                    backgroundColor: "#2975dc",
                    color: "white"
                },
                columnsButton: true,
                filtering: true,
            }}
        />
    </>)
}

export default InformeUsuarios