import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TableEncuestas from "../../components/Table/TableEncuestas"

import firebase from 'firebase/app';
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase"

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

const dbF = firebase.firestore(firebaseApp);


export default function TableList() {
  const classes = useStyles();

  const [data, setData]= useState([]);

  useEffect(()=>{
    console.log("VERRRR");
  
    dbF
    .collection("encuestas")
    .get()
    .then((response) => {
      const encuestas =[];
      response.forEach((doc)=>{  
        let encuesta = doc.data()
        encuesta.id=doc.id     
        encuestas.push(encuesta);  
    });
      setData(encuestas)
    })
    .catch((err ) => {
      console.log(err);
  
    }
    
    );
  },[]);
  /* ojo */
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
          <TableEncuestas rows={data}  />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
