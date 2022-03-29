import { Box } from "@mui/system";
import { Component } from "react";
import {
  RadialChart,
  DiscreteColorLegend,
} from "react-vis";

import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { connect } from "react-redux";
import { retrieveSeguros } from "../../connections/seguros/actions";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderColor: "black",
}));


class GraficoSituacao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      situacaoSeguro: [
        { angle: null, label: null },
        { angle: null, label: null },
        { angle: null },
        { angle: null },
      ],
    };
  }


  componentDidMount() {
    this.props.retrieveSeguros();
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.seguradoId !== this.props.seguradoId) {
      this.handleSegurado(this.props.seguradoId)
    }

  }

  handleSegurado(seguradoId) {

    const seguro = this.props.seguros.filter(
      (seguro) => seguro.segurado === seguradoId
    );

    let ValorPago = 0;
    let total = 0;
    let ValorNaoPago = 0;
    let percentagem1;
    let percentagem2;
    //let percentagem3;

    seguro.map((e) => {
      if (e.estado.situacao != null) {
        total += 1;
      }
      if (e.estado.situacao == "Pago") {
        ValorPago += 1;
      } else if (e.estado.situacao == "Não Pago") {
        ValorNaoPago += 1;
      }
      percentagem1 = parseFloat(((ValorPago / total) * 100).toFixed(2));
      percentagem2 = parseFloat(((ValorNaoPago / total) * 100).toFixed(2));
    });

    this.setState({
      DadoSituacao: [
        { angle: ValorPago, label: percentagem1 },
        { angle: ValorNaoPago, label: percentagem2 },
      ],
    });


  }

  render() {
    return (
      <Box gridColumn="span 6">
        <Item elevation={3}>
          <center>
            <p1>
              Tamanho do Sedimento da praia (Percentagem %){" "}
            </p1>
            <RadialChart
              data={this.state.DadoSituacao}
              width={250}
              height={250}
              labelsRadiusMultiplier={0.7}
              labelsStyle={{
                fontSize: 12,
              }}
              showLabels
            />
          </center>

          <DiscreteColorLegend
            orientation="horizontal"
            items={[
              { title: "Pago", color: "#79C7E3" },
              { title: "Não Pago", color: "#FF9833" },
            ]}
          />
        </Item>
      </Box>
    )
  }
}

const mapStateToprops = state => ({
  seguros: state.seguros,
});


export default connect(mapStateToprops, { retrieveSeguros, })(GraficoSituacao);