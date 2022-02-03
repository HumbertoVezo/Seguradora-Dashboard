import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { retrieveHardwares } from "../../connections/hadwares/actions";

import "react-vis/dist/style.css";

import Box from "@mui/material/Box";

import moment from "moment";
import GraficoHardwares from "./GraficoHardwares";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectOptions: [],

    };
  }

  
  async getOptionsDepartamento() {
    const res = await axios.get("http://localhost:1337/departamentos");
    const data = res.data;

    const options = data.map((e) => ({
      value: e.id,
      label: e.nome_departamento,
    }));

    this.setState({ selectOptions: options });
  }

  async handleChange(e) {
    this.setState({ currentDepartamento: e.value });

   
    const departamento = this.props.departamentos.filter( e => e.had_ware.id === e.value)
   
    let Valor1 = 0;
    let Valor2 = 0;
    let soma1 = 0;
    let media1 = 0;
    let x = 0;
    let Valor3 = 0;
    let Valor4 = 0;
    let soma2 = 0;
    let media2 = 0;
    let x1 = 0;

    departamento.map((e) => {
      if (moment(e.data_aquisicao).format("MMMM YYYY") == "January 2022") {
        x = +1;
        Valor1 = Valor1 + e.direction_after_5_minutes;
        Valor2 = Valor2 + e.direction_after_1_minute;
        soma1 = Valor1 + Valor2;
        media1 = soma1 / x;
      } else if (moment(e.data_aquisicao).format("MMMM YYYY") == "February n2022") {
        x = +1;
        Valor3 = Valor3 + e.direction_after_5_minutes;
        Valor4 = Valor4 + e.direction_after_1_minute;
        soma2 = Valor3 + Valor4;
        media2 = soma2 / x1;
      }
    });
    this.setState({
      date: [
        { x: "Janeiro", y: media1 },
        { x: "Fevereiro", y: media2 },
        { x: "Março", y: null },
        { x: "Abril", y: null },
        { x: "Maio", y: null },
        { x: "Junho", y: null },
        { x: "Julho", y: null },
        { x: "Agosto", y: null },
        { x: "Setembro", y: null },
        { x: "Outubro", y: null },
        { x: "Novembro", y: null },
        { x: "Dezembro", y: null },
      ],
    });

    
  }

  componentDidMount() {
    this.getOptionsDepartamento();

    this.props.retrieveHardwares();
  }
  render() {

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="end" />
              <h3 style={{ color: "#f9812a" }}>Gráficos</h3> <br />
              <div className="col-lg-5">
                <Select
                  options={this.state.selectOptions}
                  id="departamento"
                  name="departamento"
                  onChange={this.handleChange.bind(this)}
                />
              </div>{" "}
              <br /> <br />

              {/* Adicionar graficos em baixo */}

              <div className="col-lg-12">
                <Box sx={{ width: 1 }}>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={5}
                  >
                    {/* <GraficoTamanhoSedimentoQuantidade praiaId={this.state.currentPraia} />
                    <GraficoTamanhoSedimento praiaId={this.state.currentPraia} />
                    <GraficoMudancaSedimento  praiaId={this.state.currentPraia} />
                    <GraficoDetritos praiaId={this.state.currentPraia} />
                    <GraficoOndas praiaId={this.state.currentPraia} /> */} 
                    <GraficoHardwares departamentoId={this.state.currentDepartamento} />
                    {/* <GraficoVelCorrentes praiaId={this.state.currentPraia} /> */}
                  </Box>
                </Box>
              </div>
           
              <div className="col-lg-12">
                {" "}
                <br />
               
              </div>
             
              <div className="col-lg-12">
                {" "}
                
              
              </div>
              <div className="end" />
              <div className="col-lg-12">
                {" "}
              
               
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    had_wares: state.had_wares,
  };
};

export default connect(mapStateToProps, {
  retrieveHardwares,
  //retrieveDetritosPraias,
})(Dashboard);