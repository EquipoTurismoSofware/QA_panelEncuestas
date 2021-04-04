import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormLabel } from '@material-ui/core';
import { TextareaAutosize } from '@material-ui/core';
import 'date-fns';
import MomentUtils from '@date-io/moment';
import { FormGroup } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ItemsTipo } from "./items"
import {
    MuiPickersUtilsProvider,

    KeyboardDatePicker,
} from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import Alert from '@material-ui/lab/Alert';





const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const { setOpen, encuesta, reloadTable, reload } = props
    const [form, setForm] = useState(null)
    const [errorSave, setErrorSave] = useState(false)
    const [errors, setErrors] = useState(defaultErrors);
    const [errorCampos, setErrosCampos] = useState(false)
    const [ciudades, setCiudades] = useState(null)
    const [openBackDrop, setOpenBackDrop] = useState(false);
    useEffect(() => {
        fetch(`http://www.turismo.sanluis.gov.ar/api-turismo/public/ciudades`, {
            method: "GET",
            headers: {
                Authorization: "asdssffsdff",
                //"Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((response) => {
                let ciudadesArray = []
                response.data.registros.map((c) => {
                    ciudadesArray.push(c.nombre)
                })
                setCiudades(ciudadesArray);

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])




    const onChange = (property, value) => {
        setForm({
            ...form,
            [property]: value,
        });
    };

    const handleDateChange = (date) => {

        setForm({ ...form, "fecha": date.format("YYYY-MM-DD") })

    };

    if (form !== null) {
        console.log("tipo: " + form.tipo_establecimiento);
        console.log(form)
    }

    useEffect(() => {
        setForm(encuesta)
    }, [])


    const handleClose = () => {
        setOpen(false);
    };

    const editar = (id) => {

        if (
            !form.n_razonempresa ||
            !form.nombre_fantasia ||
            !form.domicilio ||
            !form.calle ||
            !form.codigo_postal ||
            !form.habitaciones ||
            !form.unidades ||
            !form.n_plazas ||
            form.incorporacion == null ||
            form.restaurante_bar == null ||
            form.s_habitacion == null ||
            form.piscina == null ||
            form.wifi == null ||
            form.esp_convenciones == null ||
            form.inicioActividad == 0
        ) {
            setErrosCampos(true)
            setErrors({
                inicioActividad: !form.inicioActividad
                    ? "Debe completar el campo "
                    : "",
                n_razonempresa: !form.n_razonempresa ? "Debe completar el campo" : "",
                nombre_fantasia: !form.nombre_fantasia ? "Debe completar el campo" : "",
                domicilio: !form.domicilio ? "Debe completar el campo" : "",
                calle: !form.calle ? "Debe completar el campo" : "",
                codigo_postal: !form.codigo_postal ? "Debe completar el campo" : "",
                habitaciones: !form.habitaciones ? "Debe completar el campo" : "",
                unidades: !form.unidades ? "Debe completar el campo" : "",
                n_plazas: !form.n_plazas ? "Debe completar el campo" : "",
                incorporacion: !form.incorporacion || !form.incorporacion ? "Debe escoger una opción válida" : "",
                restaurante_bar: !form.restaurante_bar ? "Debe escoger una opción válida" : "",
                s_habitacion: !form.s_habitacion ? "Debe escoger una opción válida" : "",
                piscina: !form.piscina ? "Debe escoger una opción válida" : "",
                wifi: !form.wifi ? "Debe escoger una opción válida" : "",
                esp_convenciones: !form.esp_convenciones ? "Debe escoger una opción válida" : "",

            });

        } else {
            setOpenBackDrop(true)
            const encuestaRef = firebase.firestore().collection("encuestas").doc(id);
            encuestaRef.update(form)
                .then(() => {
                    setOpenBackDrop(false)
                    reloadTable(!reload)
                    handleClose()
                }).catch((error) => {
                    setOpenBackDrop(false)
                    setErrorSave(true)
                })
        }



    }

    return (
        <div>

            <Dialog fullScreen open={true} onClose={handleClose} TransitionComponent={Transition}>
                <div className={classes.appBar}>
                    <AppBar >
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Encuesta
            </Typography>
                            <Button autoFocus color="inherit" onClick={() => editar(form.id)}>
                                Guardar
            </Button>
                        </Toolbar>
                    </AppBar>
                    {errorCampos && <Alert severity="warning" className={classes.alertError}>Debe completar todos los campos obligatorios *.</Alert>}
                </div>

                {errorSave && <Alert severity="error">No se ha podido editar la encuesta</Alert>}

                <Backdrop className={classes.backdrop} open={openBackDrop} >
                    <CircularProgress color="inherit" />
                </Backdrop>

                {form && ciudades && <FormGroup className={classes.formGroup} >

                    <MuiPickersUtilsProvider utils={MomentUtils} >

                        <Grid container justify="space-around">

                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="DD-MM-YYYY"

                                value={form.fecha}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                style={{ width: "100%" }}
                            />

                        </Grid>
                    </MuiPickersUtilsProvider>

                    <Autocomplete
                        className={classes.input}
                        value={form.localidad}
                        onChange={(event, newValue) => {
                            onChange("localidad", newValue);
                        }}
                        id="controllable-states-demo"
                        options={ciudades}
                        // style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Localidad" variant="outlined" />}
                    />
                    <TextField className={classes.input} id="standard-basic" label="Año de incio de actividad *" defaultValue={form.inicioActividad} onChange={(e) => { onChange("inicioActividad", e.target.value) }} error={errors.inicioActividad != "" && true} helperText={errors.inicioActividad} />
                    <TextField className={classes.input} id="standard-basic" label="Nombre o razón social *" defaultValue={form.n_razonempresa} onChange={(e) => { onChange("n_razonempresa", e.target.value) }} error={errors.n_razonempresa != "" && true} helperText={errors.n_razonempresa} />
                    <TextField className={classes.input} id="standard-basic" label="Nombre de fantasia *" defaultValue={form.nombre_fantasia} onChange={(e) => { onChange("nombre_fantasia", e.target.value) }} error={errors.nombre_fantasia != "" && true} helperText={errors.nombre_fantasia} />
                    <Autocomplete
                        className={classes.input}
                        value={form.tipo_establecimiento}
                        onChange={(event, newValue) => {
                            onChange("tipo_establecimiento", newValue);
                        }}
                        id="controllable-states-demo"
                        options={ItemsTipo}
                        // style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Tipo de establecimiento" variant="outlined" />}
                    />
                    <TextField className={classes.input} id="standard-basic" label="Domicilio completo del establecimiento *" defaultValue={form.domicilio} onChange={(e) => { onChange("domicilio", e.target.value) }} error={errors.domicilio != "" && true} helperText={errors.domicilio} />
                    <TextField className={classes.input} id="standard-basic" label="Calle *" defaultValue={form.calle} onChange={(e) => { onChange("calle", e.target.value) }} error={errors.calle != "" && true} helperText={errors.calle} />
                    <TextField className={classes.input} id="standard-basic" label="Ruta" defaultValue={form.ruta} onChange={(e) => { onChange("ruta", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Camino" defaultValue={form.camini} onChange={(e) => { onChange("camino", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Número o km" defaultValue={form.n_km} onChange={(e) => { onChange("n_km", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Código postal *" defaultValue={form.codigo_postal} onChange={(e) => { onChange("codigo_postal", e.target.value) }} error={errors.codigo_postal != "" && true} helperText={errors.codigo_postal} />
                    <TextField className={classes.input} id="standard-basic" label="Latitud" defaultValue={form.latitud} onChange={(e) => { onChange("latitud", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Longitud" defaultValue={form.longitud} onChange={(e) => { onChange("longitud", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Telefono fijo" defaultValue={form.tel_fijo} onChange={(e) => { onChange("tel_fijo", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Telefono celular" defaultValue={form.tel_celular} onChange={(e) => { onChange("tel_celular", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Página web" defaultValue={form.web} onChange={(e) => { onChange("web", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Email" defaultValue={form.email} onChange={(e) => { onChange("email", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Nombre de usuario en redes sociales" defaultValue={form.usuario_redes} onChange={(e) => { onChange("usuario_redes", e.target.value) }} />
                    <TextField className={classes.input} id="standard-basic" label="Número de habitaciones *" defaultValue={form.habitaciones} onChange={(e) => { onChange("habitaciones", e.target.value) }} error={errors.habitaciones != "" && true} helperText={errors.habitaciones} />
                    <TextField className={classes.input} id="standard-basic" label="Unidades (cabañars,departamentos,etc) *" defaultValue={form.unidades} onChange={(e) => { onChange("unidades", e.target.value) }} error={errors.unidades != "" && true} helperText={errors.unidades} />
                    <TextField className={classes.input} id="standard-basic" label="Plazas disponibles (camas) *" defaultValue={form.n_plazas} onChange={(e) => { onChange("n_plazas", e.target.value) }} />
                    <FormLabel className={classes.label}  >Indique si el establecimiento prevé incorporar plazas, proyecto fehaciente, construcción, reparación, etc, en los proximos 9 meses.</FormLabel>
                    <Autocomplete
                        className={classes.input}
                        value={form.incorporacion}
                        onChange={(event, newValue) => {
                            onChange("incorporacion", newValue);
                        }}
                        id="controllable-states-demo"
                        options={["Si", "No"]}
                        renderInput={(params) => <TextField {...params} label="Elija una opción" variant="outlined" />}

                    />
                    <FormLabel className={classes.labelError}  >{errors.incorporacion}</FormLabel>
                    <FormLabel className={classes.label}  >Restaurante/bar *:</FormLabel>
                    <Autocomplete
                        className={classes.input}
                        value={form.restaurante_bar}
                        onChange={(event, newValue) => {
                            onChange("s_habitacion", newValue);
                        }}
                        id="controllable-states-demo"
                        options={["Si", "No"]}
                        renderInput={(params) => <TextField {...params} label="Elija una opción" variant="outlined" />}
                    />
                    <FormLabel className={classes.labelError}  >{errors.restaurante_bar}</FormLabel>
                    <FormLabel className={classes.label}  >Servicio a la habitación *:</FormLabel>
                    <Autocomplete
                        className={classes.input}
                        value={form.s_habitacion}
                        onChange={(event, newValue) => {
                            onChange("s_habitacion", newValue);
                        }}
                        id="controllable-states-demo"
                        options={["Si", "No"]}
                        renderInput={(params) => <TextField {...params} label="Elija una opción" variant="outlined" />}
                    />
                    <FormLabel className={classes.labelError}  >{errors.s_habitacion}</FormLabel>
                    <FormLabel className={classes.label}  >Piscina *:</FormLabel>
                    <Autocomplete
                        className={classes.input}
                        value={form.piscina}
                        onChange={(event, newValue) => {
                            onChange("piscina", newValue);
                        }}
                        id="controllable-states-demo"
                        options={["Si", "No"]}
                        renderInput={(params) => <TextField {...params} label="Elija una opción" variant="outlined" />}
                    />
                    <FormLabel className={classes.labelError}  >{errors.piscina}</FormLabel>
                    <FormLabel className={classes.label}  >Wifi *:</FormLabel>
                    <Autocomplete
                        className={classes.input}
                        value={form.wifi}
                        onChange={(event, newValue) => {
                            onChange("wifi", newValue);
                        }}
                        id="controllable-states-demo"
                        options={["Si", "No"]}
                        renderInput={(params) => <TextField {...params} label="Elija una opción" variant="outlined" />}
                    />
                    <FormLabel className={classes.labelError}  >{errors.wifi}</FormLabel>
                    <FormLabel className={classes.label}  >Espacio para convenciones *:</FormLabel>
                    <Autocomplete
                        className={classes.input}
                        value={form.esp_convenciones}
                        onChange={(event, newValue) => {
                            onChange("esp_convenciones", newValue);
                        }}
                        id="controllable-states-demo"
                        options={["Si", "No"]}

                        renderInput={(params) => <TextField {...params} label="Elija una opción" variant="outlined" />}
                    />
                    <FormLabel className={classes.labelError}  >{errors.esp_convenciones}</FormLabel>
                    <FormLabel className={classes.label}  >Otro:</FormLabel>
                    <TextareaAutosize
                        className={classes.textArea}
                        aria-label="maximum height"
                        onChange={(e) => { onChange("otros", e.target.value) }}
                        defaultValue={form.otros}
                    />
                </FormGroup>}

            </Dialog>
        </div>
    );
}

function defaultErrors() {
    return {
        inicioActividad: "",
        n_razonempresa: "",
        nombre_fantasia: "",
        domicilio: "",
        calle: "",
        codigo_postal: "",
        habitaciones: "",
        unidades: "",
        n_plazas: "",
        incorporacion: "",
        restaurante_bar: "",
        s_habitacion: "",
        piscina: "",
        wifi: "",
        esp_convenciones: "",

    };
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: "0",
        position: 'fixed',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    formGroup: {
        margin: " 0px  auto",
        marginBottom: "30px",
        marginTop: "5%",
        width: "40%"
    },
    loading: {
        margin: "0px auto"
    },
    input: {
        marginTop: "20px"
    },
    label: {
        marginTop: "20px",
        color: "black"
    },
    textArea: {
        marginTop: "20px",
        minHeight: "50px"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    labelError: {
        color: "red",
        fontSize: "0.7em"
    },
    alertError: {
        top: "8%",
        position: 'fixed',
    }
}));

