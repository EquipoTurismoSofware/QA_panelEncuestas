


import React, { useEffect, useState } from "react";
import ReactExport from 'react-data-export';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { size } from "lodash"
import moment from 'moment';
import firebase from 'firebase/app';
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase"
import ReactLoading from 'react-loading';
const dbF = firebase.firestore(firebaseApp);



const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export default function ExportForExcel(props) {
    const { encuestas } = props
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const styleColumnFecha = { border: { buttom: { style: 'thin', color: { rgb: '000000' } } }, fill: { patternType: "solid", fgColor: { rgb: "21E034" } }, font: { sz: "16", bold: true }, alignment: { horizontal: "center" } }
    const styleColumnsGeneral = { font: { sz: "15", bold: true }, alignment: { horizontal: "left" } }
    const styleCellGeneral = {
        alignment: { horizontal: "left", wrapText: true },
        border: { buttom: { style: 'dashed', color: { rgb: '091D62' } } }
    }
    const styleCellNumber = {
        alignment: { horizontal: "right", wrapText: true },
    }
    
   
    const DataSet = [
        {
            columns: [

                { title: "Fecha", style: styleColumnFecha, width: { wpx: 125 }, },
                { title: "Encuestador", style: styleColumnsGeneral, width: { wch: 25 } },
                { title: "DNI Encuestador", style: styleColumnsGeneral, width: { wch: 20 } },
                { title: "Localidad", style: styleColumnsGeneral, width: { wch: 25 } },
                { title: "Nombre o razón social", style: styleColumnsGeneral, width: { wch: 25 } },
                { title: "Nombre de fantasia", style: styleColumnsGeneral, width: { wch: 25 } },
                { title: "Tipo de establecimiento", style: styleColumnsGeneral, width: { wch: 25 } },
                { title: "Año de inicio de actividad", style: styleColumnsGeneral, width: { wch: 27 } },
                { title: "Calle", style: styleColumnsGeneral, width: { wch: 22 } },
                { title: "Ruta", style: styleColumnsGeneral, width: { wch: 18 } },
                { title: "Camino", style: styleColumnsGeneral, width: { wch: 18 } },
                { title: "Número o km", style: styleColumnsGeneral, width: { wch: 18 } },
                { title: "Latitud", style: styleColumnsGeneral, width: { wch: 18 } },
                { title: "Longitud", style: styleColumnsGeneral, width: { wch: 18 } },
                { title: "Telefono fijo", style: styleColumnsGeneral, width: { wch: 22 } },
                { title: "Telefono celular", style: styleColumnsGeneral, width: { wch: 20 } },
                { title: "Whatsapp", style: styleColumnsGeneral, width: { wch: 20 } },
                { title: "Pagina Web", style: styleColumnsGeneral, width: { wch: 25 } },
                { title: "Email", style: styleColumnsGeneral, width: { wch: 25 } },
                { title: "Usuario en redes sociales", style: styleColumnsGeneral, width: { wch: 27 } },
                { title: "Habitaciones", style: styleColumnsGeneral, width: { wch: 20 } },
                { title: "Unidades (cabañas,deptos,etc)", style: styleColumnsGeneral, width: { wch: 32 } },
                { title: "Plazas", style: styleColumnsGeneral, width: { wch: 15 } },
                { title: "Prevee incorporar plazas,construcciones, etc?", style: styleColumnsGeneral, width: { wch: 50 } },
                { title: "Restaurante/bar", style: styleColumnsGeneral, width: { wch: 20 } },
                { title: "Servicios a la habitación", style: styleColumnsGeneral, width: { wch: 25 } },
                { title: "Piscina", style: styleColumnsGeneral, width: { wch: 15 } },
                { title: "Wifi", style: styleColumnsGeneral, width: { wch: 15 } },
                { title: "Espacio para convenciones", style: styleColumnsGeneral, width: { wch: 28 } },
                { title: "Otros", style: styleColumnsGeneral, width: { wch: 25 } }
            ],
            data: props.encuestas.map((data) => {
                return [
                    { value: moment(data.fecha).format('DD-MM-YYYY'), style: { fill: { fgColor: { rgb: "21E034" } }, alignment: { horizontal: "center" } } },
                    { value: data.name, style: styleCellGeneral },
                    { value: data.dni, style: styleCellNumber },
                    { value: data.localidad, style: styleCellGeneral },
                    { value: data.n_razonempresa, style: styleCellGeneral },
                    { value: data.nombre_fantasia, style: styleCellGeneral },
                    { value: data.tipo_establecimiento, style: styleCellGeneral },
                    { value: data.inicioActividad, style: styleCellNumber },
                    { value: data.calle, style: styleCellGeneral },
                    { value: data.ruta != "" ? data.ruta : "-", style: { alignment: { horizontal: "center" } } },
                    { value: data.camino != "" ? data.camino : "-", style: { alignment: { horizontal: "center" } } },
                    { value: data.n_km != "" ? data.n_km : "-", style: styleCellNumber },
                    { value: data.latitud, style: styleCellNumber },
                    { value: data.longitud, style: styleCellNumber },
                    { value: data.tel_fijo != "" ? data.tel_fijo : "-", style: styleCellNumber },
                    { value: data.tel_celular, style: styleCellNumber },
                    { value: data.wpp === 1 ? "Si" : "No", style: styleCellGeneral },
                    { value: data.web != "" ? data.web : "-", style: styleCellGeneral },
                    { value: data.email != "" ? data.email : "-", style: styleCellGeneral },
                    { value: data.usario_redes != "" ? data.usario_redes : "-", style: styleCellGeneral },
                    { value: data.habitaciones, style: styleCellNumber },
                    { value: data.unidades, style: styleCellNumber },
                    { value: data.n_plazas, style: styleCellNumber },
                    { value: data.incorporacion, style: styleCellGeneral },
                    { value: data.restaurante_bar, style: styleCellGeneral },
                    { value: data.s_habitacion, style: styleCellGeneral },
                    { value: data.piscina, style: styleCellGeneral },
                    { value: data.wifi, style: styleCellGeneral },
                    { value: data.esp_convenciones, style: styleCellGeneral },
                    { value: data.otros != "" ? data.otros : "-", style: styleCellGeneral }
                ]
            })
        }
    ]

 

    return (
        <div>
                     <Button variant="contained" className={props.className} onClick={handleOpen} color="primary">
                Descargar
</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 250,
                }}
            >

                <Fade in={open}>



                    <div className={classes.paper}>
                        {size(encuestas) === 0 ? <div style={{ alignItems: "center", justifyContent: "center" }}> <ReactLoading type={"spin"} color={"#1B472D"} className={classes.loading} />
                            <p>Cargando encuestas</p></div> : <div> <p>Encuestas cargadas</p></div>}
                        {encuestas && open && 
                            // <ExcelFile
                            //     filename="Encuestas 2021"
                            //     hideElement={true}
                            //     element={<button className={props.className} onClick={handleOpen}>Descargar excel</button>}>
                            //     <ExcelSheet dataSet={DataSet} name="Encuestas 2021 Reporte" />
                            // </ExcelFile>
                            // <ExcelFile filename="Encuestas 2021" hideElement={true} element={<button className={props.className} onClick={handleOpen}>Descargar excel</button>} >
                            //     <ExcelSheet dataSet={DataSet} name="Encuestas"/>


                            // </ExcelFile>
                            <ExcelFile
                                filename="Encuestas 2021"
                                element={<button className={props.className} onClick={handleOpen}>Descargar excel</button>}
                                hideElement={true}
                            >

                                <ExcelSheet dataSet={DataSet} name="Encuestas" />
                            </ExcelFile>

                        }

                    </div>
                </Fade>
            </Modal>


        </div>

    )


}


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    loading: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "30%"
    }
}));