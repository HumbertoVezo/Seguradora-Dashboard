import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";

import "react-vis/dist/style.css";

import Box from "@mui/material/Box";

import GraficoSeguros from "./GraficoSeguros";
import GraficoEstado from "./GraficoEstado";
import GraficoSituacao from "./GraficoSituacao";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  //  this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectOptions: [],

    };
  }

  async getOptionsSegurado() {
    const res = await axios.get("localhost:1337/segurados");
    const data = res.data;

    const options = data.map((e) => ({
      value: e.id,
      label: e.nome,
    }));

    this.setState({ selectOptions: options });
  }

  async handleChange(e) {
    this.setState({ currentSegurado: e.value });

   
    const seguro = this.props.seguros.filter( e => e.segurado.id === e.value)
  }

  componentDidMount() {
    this.getOptionsSegurado();
  }
  render() {

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="end" />
              <h3 style={{ color: "#f9812a" }}>Dashboard</h3> <br />
              <div className="col-lg-5">
                <Select
                  options={this.state.selectOptions}
                  id="segurado"
                  name="segurado"
                  onChange={this.handleChange}
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
                   {/*  <GraficoSituacao seguradoId={this.state.currentSegurado} /> */}
                    {/* <GraficoEstado seguradoId={this.state.currentSegurado} /> */}
                    {/* <GraficoSeguros seguradoId={this.state.currentSegurado} />  */}
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
export default connect(Dashboard);