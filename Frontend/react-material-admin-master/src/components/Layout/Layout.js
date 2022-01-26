import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'
import 'bootstrap/dist/css/bootstrap.min.css';

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

//medico pages
import MedicoList from "../../pages/medico/MedicoList.jsx";
import AddMedico from "../../pages/medico/AddMedico.jsx";
import EditMedico from "../../pages/medico/EditMedico.jsx";

//consulta pages
import ConsultaList from "../../pages/consulta/ConsultaList.jsx";
import AddConsulta from "../../pages/consulta/AddConsulta.jsx";
import EditConsulta from "../../pages/consulta/EditConsulta.jsx";

//especialidade pages
import EspecialidadeList from "../../pages/especialidade/EspecialidadeList.jsx";
import AddEspecialidade from "../../pages/especialidade/AddEspecialidade.jsx";
import EditEspecialidade from "../../pages/especialidade/EditEspecialidade.jsx";

//paciente pages
import PacienteList from "../../pages/paciente/PacienteList.jsx";
import AddPaciente from "../../pages/paciente/AddPaciente.jsx";
import EditPaciente from "../../pages/paciente/EditPaciente.jsx";

//servico pages
import ServicoList from "../../pages/servico/ServicoList.jsx";
import AddServico from "../../pages/servico/AddServico.jsx";
import EditServico from "../../pages/servico/EditServico.jsx";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              
              <Route path="/app/list-medico" component={MedicoList} />
              <Route path="/app/edit-medico/:id" component={EditMedico} />
              <Route path="/app/add-medico" component={AddMedico} />
              
              <Route path="/app/list-consulta" component={ConsultaList} />
              <Route path="/app/edit-consulta/:id" component={EditConsulta} />
              <Route path="/app/add-consulta" component={AddConsulta} />

              <Route path="/app/list-especialidade" component={EspecialidadeList} />
              <Route path="/app/edit-especialidade/:id" component={EditEspecialidade} />
              <Route path="/app/add-especialidade" component={AddEspecialidade} />

              <Route path="/app/list-paciente" component={PacienteList} />
              <Route path="/app/edit-paciente/:id" component={EditPaciente} />
              <Route path="/app/add-paciente" component={AddPaciente} />

              <Route path="/app/list-servico" component={ServicoList} />
              <Route path="/app/edit-servico/:id" component={EditServico} />
              <Route path="/app/add-servico" component={AddServico} />

              <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              {/* <div>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Flatlogic
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/about'}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/blog'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div> */}
              <div>
                <Link
                  href={'https://www.facebook.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
