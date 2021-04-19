import React, { useEffect, useState } from "react";

import ReactExport from "react-export-excel";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { size } from "lodash"
import firebase from 'firebase/app';
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase"
import ReactLoading from 'react-loading';
const dbF = firebase.firestore(firebaseApp);

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export default function ExportForExcel(props) {
    const { encuestas } = props
    const classes = useStyles();
    // const [encuestas, setEncuestas] = useState(null)

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // useEffect(() => {
    //     dbF.collection("encuestas").get().then((response) => {
    //         const array = []
    //         if (response.docs.length > 0) {
    //             response.forEach((item) => {
    //                 array.push(item.data())
    //             })
    //             setEncuestas(array)
    //         }
    //     })
    // }, [])
    console.log(size(encuestas))



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
                    timeout: 500,
                }}
            >

                <Fade in={open}>



                    <div className={classes.paper}>
                        {size(encuestas) === 0 ? <div style={{ alignItems: "center", justifyContent: "center" }}> <ReactLoading type={"spin"} color={"#1B472D"} className={classes.loading} />
                            <p>Cargando encuestas</p></div> : <div> <p>Encuestas cargadas</p></div>}
                        {encuestas && open && <ExcelFile hideElement={true} element={<button className={props.className} onClick={handleOpen}>Descargar excel</button>} filename={"Encuestas"}>
                            <ExcelSheet data={encuestas} name="Encuestas">
                                <ExcelColumn widthPx={300} label="Fecha" value="fecha" />
                                <ExcelColumn label="Encuestador" value="name" />
                                <ExcelColumn label="DNI Encuestador" value="dni" />
                                <ExcelColumn label="Localidad" value="localidad" />
                                <ExcelColumn label="Nombre o razón social" value="n_razonempresa" />
                                <ExcelColumn label="Nombre de fantasia " value="nombre_fantasia" />
                                <ExcelColumn label="Tipo de establecimiento" value="tipo_establecimiento" />
                                <ExcelColumn label="Año de inicio de actividad" value="inicioActividad" />
                                <ExcelColumn label="Calle" value="calle" />
                                <ExcelColumn label="Ruta" value={(col) => col.ruta != "" ? col.ruta : "-"} />
                                <ExcelColumn label="Camino" value={(col) => col.camino != "" ? col.camino : "-"} />
                                <ExcelColumn label="Numero o km" value={(col) => col.n_km != "" ? col.n_km : "-"} />
                                <ExcelColumn label="Latitud" value="latitud" />
                                <ExcelColumn label="Longitud" value="longitud" />
                                <ExcelColumn label="Telefono fijo" value={(col) => col.tel_fijo != "" ? col.tel_fijo : "-"} />
                                <ExcelColumn label="Telefono celular" value={(col) => col.tel_celular != "" ? col.tel_celular : "-"} />
                                <ExcelColumn label="Wifi" value="wifi" />
                                <ExcelColumn label="Página web" value="web" />
                                <ExcelColumn label="Email" value="email" />
                                <ExcelColumn label="Usuario en redes sociales" value="usuario_redes" />
                                <ExcelColumn label="Habitaciones" value="habitaciones" />
                                <ExcelColumn label="Unidades(cabañas,deptos, etc)" value="unidades" />
                                <ExcelColumn label="Plazas" value="n_plazas" />
                                <ExcelColumn label="Prevee incorporar plazas. construcciones, etc?" value="incorporacion" />
                                <ExcelColumn label="Restaurante/bar" value="restaurante_bar" />
                                <ExcelColumn label="Servicios a la habitación" value="s_habitacion" />
                                <ExcelColumn label="piscina" value="piscina" />
                                <ExcelColumn label="Wifi" value="wifi" />
                                <ExcelColumn label="Espacio para convenciones" value="esp_convenciones" />
                                <ExcelColumn label="Otros" value="otros" />
                            </ExcelSheet>


                        </ExcelFile>}
                    </div>
                </Fade>
            </Modal>


        </div>

    );

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