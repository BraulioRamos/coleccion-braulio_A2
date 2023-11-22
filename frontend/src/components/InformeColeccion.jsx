import MaterialTable from "@material-table/core"
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeColeccion(props) {

    return (<>
        <MaterialTable 
            columns={props.fields} data={props.data}
            title={"Informe Colección"}
            options={{
                exportMenu: [
                    {
                        label:"Exportar PDF",
                        exportFunc: (col, data) => ExportPdf(col,data,"InformeColeccion.pdf")
                    },
                    {
                        label: "Exportar CSV",
                        exportFunc: (col,data) => ExportCsv(col,data,"InformeColeccion.csv")
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
            renderSummaryRow={({ column, data }) => column.field === "precio"
            ? {
                value: data.reduce((agg, row) => agg + row.precio, 0),
                style: { background: "lightGrey" },
                }
            : undefined
            }
        />
    </>)
}

export default InformeColeccion