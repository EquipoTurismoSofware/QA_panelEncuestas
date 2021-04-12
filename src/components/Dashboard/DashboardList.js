import BusinessIcon from '@material-ui/icons/Business';
import Warning from "@material-ui/icons/Warning";
import ApartmentIcon from '@material-ui/icons/Apartment';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import GroupIcon from '@material-ui/icons/Group';
import DeckIcon from '@material-ui/icons/Deck';
import Icon from "@material-ui/core/Icon";
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import PetsIcon from '@material-ui/icons/Pets';
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';
import CasinoOutlinedIcon from '@material-ui/icons/CasinoOutlined';
import KingBedOutlinedIcon from '@material-ui/icons/KingBedOutlined';
import SingleBedOutlinedIcon from '@material-ui/icons/SingleBedOutlined';
import LocalHotelOutlinedIcon from '@material-ui/icons/LocalHotelOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import AirlineSeatFlatOutlinedIcon from '@material-ui/icons/AirlineSeatFlatOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';


import React from 'react'
import { ItemsTipo2 } from "../Encuestas/items"
import firebase from 'firebase/app';
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase"
const dbF = firebase.firestore(firebaseApp);


//hotel boutique
const iconos = [<Icon>house_icon</Icon>, <BusinessIcon />, <ApartmentIcon />, <AccessibilityIcon />, <GroupIcon />, <DeckIcon />, <LocalHotelIcon />, <AccessibilityIcon />, <PetsIcon />, <DesktopAccessDisabledIcon />, <CasinoOutlinedIcon />, <KingBedOutlinedIcon />, <SingleBedOutlinedIcon />, <LocalHotelOutlinedIcon />, <FastfoodOutlinedIcon />, <CasinoOutlinedIcon />, <AirlineSeatFlatOutlinedIcon />, <HomeWorkOutlinedIcon />]

export const DataDashBoard = (tipo_cantidad) => {
    var cont = 0;
    const array = []
    const data = tipo_cantidad.sort((a, b) => {
        if (a.cantidad > b.cantidad)
            return -1
        if (a.cantidad < b.catidad)
            return 1
        else return 0
    }).map((item, index) => {
        return { ...item, icono: iconos[index] }
    })

    console.log(data.length)
    while (cont < data.length) {

        array.push(data.slice(cont, cont + 4))
        cont = cont + 4
    }
    return array

}

const crearDatos = () => {

    ItemsTipo2.map((item, index) => {

        dbF
            .collection("encuestas")
            .where("tipo_establecimiento", "==", item)
            .get()
            .then((response) => {

                let dato = { "tipo": item, "cantidad": response.docs.length }
                dbF
                    .collection("tipo_cantidad")
                    .add(dato)
                    .then(() => { })
                    .catch((err) => {
                        console.log(err)
                    });

            })
            .catch((err) => {
                console.log(err);

            }

            );

    })
}
