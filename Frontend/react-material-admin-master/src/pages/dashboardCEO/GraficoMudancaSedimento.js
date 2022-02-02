import { Box } from "@mui/system";
import { Component } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalBarSeries,

} from "react-vis";

import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { connect } from "react-redux";
import { retrieveResultadoAreiaGranulometrias } from "../../../conection/resultadoareiagranulometrias/actions";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderColor: "black",
}));

const minOffset = 0;
const maxOffset = 60;


class GraficoTamanhoSedimento extends Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(50), (val, index) => index + year);


    this.state = {
      currentPraia: null,
      thisYear: new Date().getFullYear(),
      selectedYear: new Date().getFullYear(),
      media_Tamanho_sedimentos: [
        { x: "Janero", y: null },
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
      ],

    };
  }


  componentDidMount() {
    this.props.retrieveResultadoAreiaGranulometrias();
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.praiaId !== this.props.praiaId) {
      this.handleTamnhoSedimento(this.props.praiaId)
    }

  }

  onHandleChange = (event) => {

    const resultado = this.props.resultadoareiagranulometrias.filter(
      (resultado) => resultado.amostraareia.praia === this.props.praiaId
    );

    let media_janeiro = 0;
    let total_janeiro = 0;
    let soma_janeiro = 0;

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
    

    resultado.map((e) => {
      if (moment(e.sand_collect_date).format("YYYY") === event.target.value) {

        if (moment(e.sand_collect_date).format("MMMM") === 'January') {
          total_janeiro += 1;
          soma_janeiro = soma_janeiro + e.Size;
          media_janeiro = soma_janeiro / total_janeiro;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") === 'February') {
          total_fevereiro += 1;
          soma_fevereiro = soma_fevereiro + e.Size;
          media_fevereiro = soma_fevereiro / total_fevereiro;
        } else if (
          moment(e.sand_collect_date).format("MMMM") == "March") {
          total_marco += 1;
          soma_marco = soma_marco + e.Size;
          media_marco = soma_marco / total_marco;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") === "April") {
          total_abril += 1;
          soma_abril = soma_abril + e.Size;
          media_abril = soma_abril / total_abril;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") === "May") {
          total_maio += 1;
          soma_maio = soma_maio + e.Size;
          media_maio = soma_maio / total_maio;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") === "June") {
          total_junho += 1;
          soma_junho = soma_junho + e.Size;
          media_junho = soma_junho / total_junho;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") === "July") {
          total_julho += 1;
          soma_julho = soma_julho + e.Size;
          media_julho = soma_julho / total_julho;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") === "August") {
          total_agosto += 1;
          soma_agosto = soma_agosto + e.Size;
          media_agosto = soma_agosto / total_agosto;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") == "September") {
          total_setembro += 1;
          soma_setembro = soma_setembro + e.Size;
          media_setembro = soma_setembro / total_setembro;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") === "October") {
          total_outubro += 1;
          soma_outubro = soma_outubro + e.Size;
          media_outubro = soma_outubro / total_outubro;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") === "November") {
          total_novembro += 1;
          soma_novembro = soma_novembro + e.Size;
          media_novembro = soma_novembro / total_novembro;
        }
        else if (
          moment(e.sand_collect_date).format("MMMM") === "December") { 
          total_dezembro += 1;
          soma_dezembro = soma_dezembro + e.Size;
          media_dezembro = soma_dezembro / total_dezembro;
        }
      }

    });
    this.setState({
      media_Tamanho_sedimentos: [
        { x: "Janero", y: media_janeiro },
        { x: "Fevereiro", y: media_fevereiro },
        { x: "Março", y: media_marco },
        { x: "Abril", y: media_abril },
        { x: "Maio", y: media_maio },
        { x: "Junho", y: media_junho },
        { x: "Julho", y: media_julho },
        { x: "Agosto", y: media_agosto },
        { x: "Setembro", y: media_setembro },
        { x: "Outubro", y: media_outubro },
        { x: "Novembro", y: media_novembro },
        { x: "Dezembro", y: media_dezembro },
      ],
    });
  };


  handleTamnhoSedimento(praiaId) {

    const resultado = this.props.resultadoareiagranulometrias.filter(
      (resultado) => resultado.amostraareia.praia === praiaId
    );

    let media_janeiro;
    let total_janeiro = 0;
    let soma_janeiro = 0;

    let media_feveriro;
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



    resultado.map((e) => {
      if (moment(e.sand_collect_date).format("MMMM") == "January" && moment(e.sand_collect_date).format("YYYY") === moment().format('YYYY')) {
        total_janeiro += 1;
        soma_janeiro = soma_janeiro + e.Size;
        media_janeiro = soma_janeiro / total_janeiro;
      } 
      else if (
        moment(e.sand_collect_date).format("MMMM") == "February" && moment(e.sand_collect_date).format("YYYY") == moment().format('YYYY')) {
        total_fevereiro += 1;
        soma_fevereiro = soma_fevereiro + e.Size;
        media_feveriro = soma_fevereiro / total_fevereiro;
      } 
      else if (
        moment(e.sand_collect_date).format("MMMM") == "March" && moment(e.sand_collect_date).format("YYYY") == moment().format('YYYY')) {
        total_marco += 1;
        soma_marco = soma_marco + e.Size;
        media_marco = soma_marco / total_marco;
      }
      else if (
        moment(e.sand_collect_date).format("MMMM") == "April" && moment(e.sand_collect_date).format("YYYY") === moment().format('YYYY')) {
        total_abril += 1;
        soma_abril = soma_abril + e.Size;
        media_abril = soma_abril / total_abril;
      }
      else if (
        moment(e.sand_collect_date).format("MMMM") == "May" && moment(e.sand_collect_date).format("YYYY") == moment().format('YYYY')) {
        total_maio += 1;
        soma_maio = soma_maio + e.Size;
        media_maio = soma_maio / total_maio;
      }
      else if (
        moment(e.sand_collect_date).format("MMMM") == "June" && moment(e.sand_collect_date).format("YYYY") === moment().format('YYYY')) {
        total_junho += 1;
        soma_junho = soma_junho + e.Size;
        media_junho = soma_junho / total_junho;
      }
      else if (
        moment(e.sand_collect_date).format("MMMM") == "July" && moment(e.sand_collect_date).format("YYYY") === moment().format('YYYY')) {
        total_julho += 1;
        soma_julho = soma_julho + e.Size;
        media_julho = soma_julho / total_julho;
      }
      else if (
        moment(e.sand_collect_date).format("MMMM") == "August" && moment(e.sand_collect_date).format("YYYY") === moment().format('YYYY')) {
        total_agosto += 1;
        soma_agosto = soma_agosto + e.Size;
        media_agosto = soma_agosto / total_agosto;
      }
      else if (
        moment(e.sand_collect_date).format("MMMM") == "September" && moment(e.sand_collect_date).format("YYYY") === moment().format('YYYY')) {
        total_setembro += 1;
        soma_setembro = soma_setembro + e.Size;
        media_setembro = soma_setembro / total_setembro;
      }
      else if (
        moment(e.sand_collect_date).format("MMMM") == "October" && moment(e.sand_collect_date).format("YYYY") === moment().format('YYYY')) {
        total_outubro += 1;
        soma_outubro = soma_outubro + e.Size;
        media_outubro = soma_outubro / total_outubro;
      }
      else if (
        moment(e.sand_collect_date).format("MMMM") == "November" && moment(e.sand_collect_date).format("YYYY") === moment().format('YYYY')) {
        total_novembro += 1;
        soma_novembro = soma_novembro + e.Size;
        media_novembro = soma_novembro / total_novembro;
      }
      else if (
        moment(e.sand_collect_date).format("MMMM") == "December" && moment(e.sand_collect_date).format("YYYY") === moment().format('YYYY')) {
        total_dezembro += 1;
        soma_dezembro = soma_dezembro + e.Size;
        media_dezembro = soma_dezembro / total_dezembro;
      }
    });

    this.setState({
      media_Tamanho_sedimentos: [
        { x: "Janero", y: media_janeiro },
        { x: "Fevereiro", y: media_feveriro },
        { x: "Março", y: media_marco },
        { x: "Abril", y: media_abril },
        { x: "Maio", y: media_maio },
        { x: "Junho", y: media_junho },
        { x: "Julho", y: media_julho },
        { x: "Agosto", y: media_agosto },
        { x: "Setembro", y: media_setembro },
        { x: "Outubro", y: media_outubro },
        { x: "Novembro", y: media_novembro },
        { x: "Dezembro", y: media_dezembro },
      ],


    });

  }

  render() {
    const { thisYear, selectedYear } = this.state;
    const options = [];

    for (let i = minOffset; i <= maxOffset; i++) {
      const year = thisYear - i;
      options.push(<option value={year}>{year}</option>);
    }

    return (
      <Box gridColumn="span 12">
        <Item elevation={3}>
          <p1>
            Gráfico de barras das mudanças de tamanho dos
            sedimentos.
          </p1>
          <div className="col-lg-2">
            <select
              options={this.selectedYear}
              onChange={this.onHandleChange}
            >
              {options}
            </select>{" "}
          </div>

          <center>
            <XYPlot
              className="clustered-stacked-bar-chart-example"
              xType="ordinal"
              color="#FABB51"
              stroke="#F47340"
              width={950}
              height={350}
            >
              <YAxis title="Tamanho medio dos sedimentos" />
              <HorizontalGridLines />
              <XAxis tickLabelAngle={-28} />
              <VerticalBarSeries
                cluster="2016"
                data={[
                  { x: "", y: "" },
                  ...this.state.media_Tamanho_sedimentos,
                ]}
              />
            </XYPlot>
          </center>
        </Item>
      </Box>
    )
  }
}


const mapStateToprops = state => ({
  resultadoareiagranulometrias: state.resultadoareiagranulometrias,
});



export default connect(mapStateToprops, { retrieveResultadoAreiaGranulometrias, })(GraficoTamanhoSedimento);