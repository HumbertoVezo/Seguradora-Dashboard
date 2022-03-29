import { retrieveHardwares } from "../../connections/hadwares/actions";
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
const maxOffset = 10;

const getInitialState = (jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez) => [
  { x: "Janeiro", y: jan },
  { x: "Fevereiro", y: fev },
  { x: "Março", y: mar },
  { x: "Abril", y: abr },
  { x: "Maio", y: mai },
  { x: "Junho", y: jun },
  { x: "Julho", y: jul },
  { x: "Agosto", y: ago },
  { x: "Setembro", y: set },
  { x: "Outubro", y: out },
  { x: "Novembro", y: nov },
  { x: "Dezembro", y: dez },
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
      hp: getInitialState(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      data_aquisicao1: getInitialState(),
      marcas:[]
    };
  }
  componentDidMount() {
    this.props.retrieveHardwares();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hardwareId !== this.props.hardwareId) {
      this.onHandleChange(this.props.hardwareId);
    }

    if (this.props.hardwares !== prevProps.hardwares) {
     this.HandleMarca();
    }

  }

  HandleMarca(){
    const marca = this.props.hardwares.reduce((acc, hardware) => {
      const exists = acc.find(item => item.marca === hardware.marca)

      if (!exists) {
        acc.push({id:hardware.id, marca:hardware.marca})
      }
      return acc
    },[])
    this.setState({marcas:marca})
  }

  onHandleChange = (hardwareId) => {
     const hardwares = this.props.hardwares.filter(
       (had_ware) => had_ware.marca === hardwareId  // verificar isso se der erro
     );

    let precoJanHp = 0
    let precoFevHp = 0
    let precoMarHp = 0
    let precoAbrHp = 0
    let precoMaiHp = 0
    let precoJunHp = 0
    let precoJulHp = 0
    let precoAgoHp = 0
    let precoSetHp = 0
    let precoOutHp = 0
    let precoNovHp = 0
    let precoDecHp = 0
    

    hardwares.map((hardware) => {
        if (moment(hardware.data_aquisicao).format("MMMM") == "January") {
          precoJanHp += parseInt(hardware.preco, 10)
        } else if (moment(hardware.date).format("MMMM YYYY") == "February") {
          precoFevHp += parseInt(hardware.preco, 10)
        } else if (moment(hardware.data_aquisicao).format("MMMM") == "March") {
          precoMarHp += parseInt(hardware.preco, 10)
        } else if (moment(hardware.data_aquisicao).format("MMMM") == "April") {
          precoAbrHp += parseInt(hardware.preco, 10)
        }else if (moment(hardware.data_aquisicao).format("MMMM") == "May") {
          precoMaiHp += parseInt(hardware.preco, 10)
        }else if (moment(hardware.data_aquisicao).format("MMMM") == "June") {
          precoJunHp += parseInt(hardware.preco, 10)
        }else if (moment(hardware.data_aquisicao).format("MMMM") == "July") {
          precoJulHp += parseInt(hardware.preco, 10)
        }else if (moment(hardware.data_aquisicao).format("MMMM") == "August") {
          precoAgoHp += parseInt(hardware.preco, 10)
        }else if (moment(hardware.data_aquisicao).format("MMMM") == "September") {
          precoSetHp += parseInt(hardware.preco, 10)
        }else if (moment(hardware.data_aquisicao).format("MMMM") == "October") {
          precoOutHp += parseInt(hardware.preco, 10)
        }else if (moment(hardware.data_aquisicao).format("MMMM") == "November") {
          precoNovHp += parseInt(hardware.preco, 10)
        }else if (moment(hardware.data_aquisicao).format("MMMM") == "December") {
          precoDecHp += parseInt(hardware.preco, 10)
        } 
        
      

    });

    this.UpdateUpdateInitialStateState("hp",
      precoJanHp,
      precoFevHp,
      precoMarHp,
      precoAbrHp,
      precoMaiHp,
      precoJunHp,
      precoJulHp,
      precoAgoHp,
      precoSetHp,
      precoOutHp,
      precoNovHp,
      precoDecHp,
    )
  }
  UpdateUpdateInitialStateState(marca, jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dec) {
    this.setState({
      [marca]: getInitialState(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dec),
    });
  }

  render() {
    const { thisYear, selectedYear } = this.state;
    const options = [];

    /*  const handleCustomScale = (tick) => {
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
     };*/

    for (let i = minOffset; i <= maxOffset; i++) {
      const year = thisYear - i;
      options.push(<option value={year}>{year}</option>);
    }

    return (
      <Box gridColumn="span 12" sx={{ flexGrow: 1 }}>
        <Item elevation={3}>
          <p1>Gráfico de barras dos hardwares adquiridos</p1>
          <div className="col-lg-2">
            <select onChange={e => this.onHandleChange(e.target.value)}>
              {this.state.marcas.map(item => ( <option value={item.marca}>{item.marca}</option>))}
            </select>{" "}
          </div>
          <center>
            <XYPlot
              className="clustered-stacked-bar-chart-example"
              xType="ordinal"
              width={800}
              height={400}
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
                    title: "Preço",
                    color: "#f37748",
                  },
                  {
                    title: "Produto",
                    color: "#067BC2",
                  },
                ]}
              />

              <YAxis title="Preço (CVE)" />
              <HorizontalGridLines />
              <XAxis tickLabelAngle={-28} />

              <VerticalBarSeries
                cluster="velocidade"
                color="#f37748"
                data={[
                  { x: "", y: "" },
                  ...this.state.hp,
                ]}
              />

              <YAxis
                title=""
                orientation="right"

              />
              <XAxis orientation="top" />
              <YAxis orientation="right" />
            </XYPlot>
          </center>{" "}
        </Item>
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    departamentos: state.departamentos,
    hardwares: state.had_wares
  };
};
export default connect(mapStateToProps, {
  retrieveHardwares,
})(GraficoHardwares);
