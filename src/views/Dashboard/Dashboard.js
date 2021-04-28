import React, { useEffect, useState } from "react";
import firebase from 'firebase/app';
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase"
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import "./Dashboard.css"
import { DataDashBoard, ActualizarDatos } from "../../components/Dashboard/DashboardList"
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Button from "components/CustomButtons/Button.js";

const dbF = firebase.firestore(firebaseApp);

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [tipo_count, setTipo_Count] = useState(null)
  const [dataDash, setDataDash] = useState(null)
  const [fechaAct, setFechaAct] = useState("")
  const classes = useStyles();

  const Update = () => {
    const tipo_cantidad = [];

    ActualizarDatos.then((response) => {
      console.log("entro aca quinto")
      let dia = new Date().getDate();
      let mes = new Date().getMonth() +1;
      let año = new Date().getFullYear();

      let dato = {"fecha": `${dia}/${mes}/${año}`}
      dbF.collection("tipo_cantidad").get().then((response) => {
        response.forEach((doc) => {
          tipo_cantidad.push(doc.data())
        });

        dbF.collection("fecha_actualizacion").doc("1").delete().then(() => {
          dbF.collection("fecha_actualizacion").doc("1").set(dato)
          .then(() => { 
              setFechaAct(dato.fecha)
          })
          .catch((err) => {
              return false
          }); 
        }).catch((err) => {
            return false
        })     
        

        setTipo_Count(tipo_cantidad)
      })

    }).catch((error) => console.log(error))
    // CrearDatos()
  } 

  useEffect(() => {
    const tipo_cantidad = [];

    dbF.collection("tipo_cantidad").get().then((response) => {
      response.forEach((doc) => {
        tipo_cantidad.push(doc.data())
      });
      setTipo_Count(tipo_cantidad)
    })

    dbF.collection("fecha_actualizacion")
    .get()
    .then((response) => {
      response.forEach((doc) => {
        setFechaAct(doc.data().fecha)
      });
      
    })
  }, [])

  useEffect(() => {
    if (tipo_count) {
      setDataDash(DataDashBoard(tipo_count))
    }
  }, [tipo_count])

  return (
    <div>
       <Button onClick={() => Update()}>Actualizar dashboard</Button> 
       <span style={{marginLeft: 20}}>Ultima actualizacion:  {fechaAct} </span>
      {dataDash && <Carousel infiniteLoop={true} autoPlay={true} interval={2000} stopOnHover={true}>

        {
          dataDash.map((items) => {
            return <div>
              <GridContainer>
                {items.map((item) => {
                  return <GridItem xs={12} sm={6} md={4}>
                    <Card>
                      <CardHeader color="warning" stats icon>
                        <CardIcon className={`${item.clase}`}>
                          {item.icono}
                        </CardIcon>
                        <p className={classes.cardCategory}>{item.tipo}</p>
                        <h3 className={classes.cardTitle}>
                          <small>{item.cantidad}   </small>
                        </h3>
                      </CardHeader>
                      <CardFooter stats>
                        <div className={classes.stats}>
                          <Danger>

                          </Danger>

                        </div>
                      </CardFooter>
                    </Card>
                  </GridItem>
                })}
              </GridContainer>
            </div>
          })
        }
      </Carousel>}
     
    </div>

  );
}

const misClases = makeStyles((theme) => ({
  hosteria: {
    float: "left",
    padding: "15px",
    marginTop: "-20px",
    marginRight: "15px",
    borderRadius: "3px",
    backgroundColor: "blue",

  },
  hotel: {
    float: "left",
    padding: "15px",
    marginTop: "-20px",
    marginRight: "15px",
    borderRadius: "3px",
    backgroundColor: "#7B963C",
  }
}));