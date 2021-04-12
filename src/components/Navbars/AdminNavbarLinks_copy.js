import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
   
  return (
    <div>    
      <div className={classes.manager}>              
                  <CustomInput
                    labelText="Nombre o Email"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />               
      </div>
      <Button
        
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Ingresar"
        className={classes.buttonLink}
      >
      </Button>
      <div className={classes.manager}>              
          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
          />
       </div>
       <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Ingresar"
        className={classes.buttonLink}
      >
       </Button>
       <div className={classes.manager}>
       <Button 
        variant="contained" color="primary" 
        disableRipple className={classes.margin}
        onClick={""}
        >Login
        </Button>
    
      </div>
     
    </div>
  );
}
