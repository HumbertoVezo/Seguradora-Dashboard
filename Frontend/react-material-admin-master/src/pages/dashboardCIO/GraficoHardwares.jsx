import { retrieveDepartamentos } from "../../connections/departamentos/actions";
import moment from "moment";
import Box from "@mui/material/Box";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalBarSeries,
  LineSeries,
  DiscreteColorLegend,
} from "react-vis";
import { Item } from "./Item";

const minOffset = 0;
const maxOffset = 5;

const getInitialState = () => [
  { x: "Janeiro", y: null },
  { x: "Fevereiro", y: null },
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
];

class GraficoHardwares extends Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(50), (val, index) => index + year);

    this.state = {
      selectOptions: [],
      thisYear: new Date().getFullYear(),
      selectedYear: new Date().getFullYear(),
      data_aquisicao: getInitialState(),
      data_aquisicao1: getInitialState(),
    };
  }
  componentDidMount() {
    this.props.retrieveDepartamentos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.departamentoId !== this.props.departamentoId) {
      this.onHandleChange(this.props.departamentoeId);
    }
  }

  onHandleChange = (departamentoId) => {
    const had_ware = this.props.departamento.filter(
      (resultado) => resultado.departamento.id === departamentoId  // verificar isso se der erro
    );
    console.log(had_ware);

    let media_janeiro = 0;
    let total_janeiro = 0;
    let soma_janeiro = 0;

    let media_janeiro1 = 0;
    let total_janeiro1 = 0;
    let soma_janeiro1 = 0;

    let media_janeiro2 = 0;
    let total_janeiro2 = 0;
    let soma_janeiro2 = 0;

    let media_janeiro3 = 0;
    let total_janeiro3 = 0;
    let soma_janeiro3 = 0;

    let media_fevereiro;
    let total_fevereiro = 0;
    let soma_fevereiro = 0;

    let media_marco;
    let total_marco = 0;
    let soma_marco = 0;

    let media_abril;
    let total_abril = 0;
    let soma_abril = 0;

    let media_maio;
    let total_maio = 0;
    let soma_maio = 0;

    let media_junho;
    let total_junho = 0;
    let soma_junho = 0;

    let media_julho;
    let total_julho = 0;
    let soma_julho = 0;

    let media_agosto;
    let total_agosto = 0;
    let soma_agosto = 0;

    let media_setembro;
    let total_setembro = 0;
    let soma_setembro = 0;

    let media_outubro;
    let total_outubro = 0;
    let soma_outubro = 0;

    let media_novembro;
    let total_novembro = 0;
    let soma_novembro = 0;

    let media_dezembro;
    let total_dezembro = 0;
    let soma_dezembro = 0;
    had_ware.map((e) => {
      if (moment(e.date).format("MMMM YYYY") == "January") {
        total_janeiro += 1;
        soma_janeiro = soma_janeiro + e.preco;
        media_janeiro = soma_janeiro / total_janeiro;
        total_janeiro1 += 1;
        soma_janeiro1 = soma_janeiro1 + e.preco;
        media_janeiro1 = soma_janeiro1 / total_janeiro1;

        total_janeiro2 += 1;
        soma_janeiro2 = soma_janeiro2 + e.preco;
        media_janeiro2 = soma_janeiro2 / total_janeiro2;
        total_janeiro3 += 1;
        soma_janeiro3 = soma_janeiro3 + e.preco;
        media_janeiro3 = soma_janeiro3 / total_janeiro3;
      } else if (moment(e.date).format("MMMM YYYY") == "February") {
      }
    });
    this.UpdateUpdateInitialStateState(
      "Janeiro",
      media_janeiro,
      media_janeiro1,
      media_janeiro2,
      media_janeiro3
    );
  };

  UpdateUpdateInitialStateState(month) {
    this.setState({
      [`had-wares${month}`]: getInitialState(),
    });
  }

  render() {
    const { thisYear, selectedYear } = this.state;
    const options = [];

    const handleCustomScale = (tick) => {
      // Can be add a customStart parameter to sum with result
      //                                     if scales doesn't start at same point
      const maxSalesValue = Math.max(
        ...this.state.data_aquisicao.map((item) => item.y)
      ); // Get max value from sales data
      const maxPriceValue = Math.max(
        ...this.state.data_aquisicao1.map((item) => item.y)
      ); // Get max value from prices data
      const factor = maxSalesValue / maxPriceValue; // Calculate factor to convert sales tick to price tick
      return Math.round(tick / factor); // Return result as a integer
    };

    for (let i = minOffset; i <= maxOffset; i++) {
      const year = thisYear - i;
      options.push(<option value={year}>{year}</option>);
    }
    return (
      <Box gridColumn="span 12" sx={{ flexGrow: 1 }}>
        <Item elevation={3}>
          <p1>
            Gráfico de barras dos hardwares por departamentos adequiridos   
            ao longo do tempo
          </p1>
          <div className="col-lg-2">
            <select options={this.selectedYear} onChange={this.onHandleChange}>
              {options}
            </select>{" "}
          </div>
          <center>
            <XYPlot
              className="clustered-stacked-bar-chart-example"
              xType="ordinal"
              width={950}
              height={350}
            >
              <DiscreteColorLegend
                width={150}
                style={{
                  textAlign: "start",
                  position: "absolute",
                  left: "100%",
                  top: "50%",
                }}
                items={[
                  {
                    title: "Velocidade",
                    color: "#f37748",
                  },
                  {
                    title: "Direção",
                    color: "#067BC2",
                  },
                ]}
              />

              <YAxis title="Velocidade(m/s)" />
              <HorizontalGridLines />
              <XAxis tickLabelAngle={-28} />

              <VerticalBarSeries
                cluster="velocidade"
                color="#f37748"
                data={[
                  { x: "", y: "" },
                  ...this.state.data_aquisicao,
                ]}
              />

              <YAxis
                title="Direção (graus)"
                orientation="right"
                tickFormat={(v) => handleCustomScale(v)}
              />
              <XAxis orientation="top" />
              <YAxis orientation="right" />
              <LineSeries
                cluster="direcao"
                color="#067BC2"
                Type="line"
                data={[
                  { x: "", y: "" },
                  ...this.state.data_aquisicao,
                ]}
              />
            </XYPlot>
          </center>{" "}
        </Item>
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    had_wares: state.had_wares,
  };
};
export default connect(mapStateToProps, {
  retrieveDepartamentos,
})(GraficoHardwares);
