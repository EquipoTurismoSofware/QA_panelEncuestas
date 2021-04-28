import { House ,Apartment, Pets, Accessibility, Group, Deck, Business, LocalHotel, CasinoOutlined, LocalHotelOutlined, DesktopAccessDisabled, KingBedOutlined, SingleBedOutlined, FastfoodOutlined, AirlineSeatFlatOutlined, HomeWorkOutlined} from '@material-ui/icons';
import React from 'react'
import { ItemsTipo2, ItemsTipo } from "../Encuestas/items"
import firebase from 'firebase/app';
import "firebase/firestore";
import { firebaseApp } from "../../utils/firebase"
const dbF = firebase.firestore(firebaseApp);

//hotel boutique
const iconos = [<House />, <Business />, <Apartment />, <Accessibility />, <Group />, <Deck />, <LocalHotel/>, <Accessibility/>, <Pets/>, <DesktopAccessDisabled />, <CasinoOutlined />, <KingBedOutlined/>, <SingleBedOutlined />, <LocalHotelOutlined />, <FastfoodOutlined />, <CasinoOutlined />, <AirlineSeatFlatOutlined />, <HomeWorkOutlined />]

export const DataDashBoard = (tipo_cantidad) => {
    // deleteDatos()
    // crearDatos()
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


    while (cont < data.length) {

        array.push(data.slice(cont, cont + 3))
        cont = cont + 3
    }
    return array

}

export const ActualizarDatos = new Promise((resolve, reject) => {
    console.log("entro aca primero")
    dbF
        .collection("tipo_cantidad")
        .get()
        .then((response) => {
            var x = response.docs.length
            console.log(x);
            var cnt = 0;

            response.forEach((doc) => {
                cnt++  
                dbF.collection("tipo_cantidad").doc(doc.id).delete().then(() => { 
                }).catch((err) => {
                    return false
                })         
            })
             
            var re = new RegExp('\\s', 'g');
            console.log("entro aca segundo")
            if(cnt == x){
                ItemsTipo.map((item, index) => {
                dbF
                    .collection("encuestas")
                    .where("tipo_establecimiento", "==", item)
                    .get()
                    .then((response) => {
                        console.log("entro aca tercero")
                        let dato = { "tipo": item, "cantidad": response.docs.length, clase: `icon ${item.toLowerCase().replace(re, "-")}` }
                        dbF
                            .collection("tipo_cantidad")
                            .add(dato)
                            .then(() => { 
                                console.log("entro aca cuarto")
                            })
                            .catch((err) => {
                                return false
                            });

                    })
                    .catch((err) => {
                        return false
                    }
                );
                return false
                })
            }     
        })
        .catch((err) => {
            return false

        }) ? resolve(false) : reject(false)



})


