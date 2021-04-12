import React, { useEffect, useState } from "react";
import firebase from 'firebase/app';
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase"
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import { DataDashBoard } from "../../components/Dashboard/DashboardList"
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";


const dbF = firebase.firestore(firebaseApp);






const useStyles = makeStyles(styles);







export default function Dashboard() {
  const [tipo_count, setTipo_Count] = useState(null)
  const [dataDash, setDataDash] = useState(null)

  const classes = useStyles();
  const estilos = misClases()
  useEffect(() => {
    const tipo_cantidad = [];


    dbF.collection("tipo_cantidad").get().then((response) => {
      response.forEach((doc) => {

        tipo_cantidad.push(doc.data())

      });

      setTipo_Count(tipo_cantidad)
    })




  }, [])

  useEffect(() => {
    if (tipo_count) {
      setDataDash(DataDashBoard(tipo_count))
    }

  }, [tipo_count])

  if (dataDash)
    dataDash.map((items) => {
      items.map((item) => {
        console.log(item)
      })
    })

  return (
    <div>
      {dataDash && <Carousel infiniteLoop={true} autoPlay={true} interval={2000} stopOnHover={true}>

        {
          dataDash.map((items) => {
            return <div>
              <GridContainer>
                {items.map((item) => {
                  return <GridItem xs={12} sm={6} md={3}>
                    <Card>
                      <CardHeader color="warning" stats icon>
                        <CardIcon color="warning">
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


      {/* <GridContainer>


 
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AccessibilityIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Posadas</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}


      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Total Encuestas</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}> Departamentos </h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>

            <CardBody>
              <h4 className={classes.cardTitle}> Tipo de Alojamientos </h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>

        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>

          </Card>
        </GridItem>
      </GridContainer>
    </div >
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