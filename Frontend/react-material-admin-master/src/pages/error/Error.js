import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Logo from "../../images/logo.png"

// styles
import useStyles from "./styles";

export default function Error() {
  var classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotype}>
        <div className="logo d-flex justify-content-between">
          <img src={Logo} alt="2" width="35px" height="15px" />
        </div>
        <Typography variant="h3" color="white" className={classes.logotypeText}>
          Centro Saúde CV
        </Typography>
      </div>
      <Paper classes={{ root: classes.paperRoot }}>
        <Typography
          variant="h1"
          color="primary"
          className={classnames(classes.textRow, classes.errorCode)}
        >
          404
        </Typography>
        <Typography variant="h5" color="primary" className={classes.textRow}>
          Oops. Parece que a pagina que deseja aceder já não existe
        </Typography>
        <Typography
          variant="h6"
          color="text"
          colorBrightness="secondary"
          className={classnames(classes.textRow, classes.safetyText)}
        >
          Mas estamos aqui para te trazer de volta
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          size="large"
          className={classes.backButton}
        >
          Voltar para a pagina principal
        </Button>
      </Paper>
    </Grid>
  );
}
