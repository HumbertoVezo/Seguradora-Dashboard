import { Box } from "@mui/system";
import { Component } from "react";
import {
  RadialChart,
  DiscreteColorLegend,
} from "react-vis";

import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { connect } from "react-redux";
import { retrieveResultadoAreiaGranulometrias } from "../../../conection/resultadoareiagranulometrias/actions";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderColor: "black",
  }));


class GraficoTamanhoSedimento extends Component {
    constructor(props) {
        super(props);

        this.state = {
          Tamanho_sedimentos: [
            { angle: null, label: null },
            { angle: null, label: null },
            { angle: null },
            { angle: null },
          ],
            };
        }
    

    componentDidMount() {
      this.props.retrieveResultadoAreiaGranulometrias();
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.praiaId !== this.props.praiaId) {
           this.handleTamnhoSedimento(this.props.praiaId)
        }

    }
    
    handleTamnhoSedimento(praiaId) {
     
    const resultado = this.props.resultadoareiagranulometrias.filter(
      (resultado) => resultado.amostraareia.praia === praiaId
    );
    
    let ValorMenor1 = 0;
    let total = 0;
    let ValorEntre12 = 0;
    let ValorEntre23 = 0;
    let ValorMaior4 = 0;
    let percentagem1;
    let percentagem2;
    let percentagem3;
    let percentagem4;
    
    resultado.map((e) => {
      if (e.Size != null) {
        total += 1;
      }
      if (e.Size < 1) {
        ValorMenor1 += 1;
      } else if (e.Size >= 1 && e.Size < 2) {
        ValorEntre12 += 1;
      } else if (e.Size >= 2 && e.Size < 4) {
        ValorEntre23 += 1;
      } else if (e.Size > 4) {
        ValorMaior4 += 1;
      }
      percentagem1 = parseFloat(((ValorMenor1 / total) * 100).toFixed(2));
      percentagem2 = parseFloat(((ValorEntre12 / total) * 100).toFixed(2));
      percentagem3 = parseFloat(((ValorEntre23 / total) * 100).toFixed(2));
      percentagem4 = parseFloat(((ValorMaior4 / total) * 100).toFixed(2));  
        });
    
        this.setState({
          Tamanho_sedimentos: [
            { angle: ValorMenor1, label: percentagem1 },
            { angle: ValorEntre12, label: percentagem2 },
            { angle: ValorEntre23, label: percentagem3 },
            { angle: ValorMaior4, label: percentagem4 },
          ],
        });
    
    
  }
      
    render() {
        return(
            <Box gridColumn="span 6">
            <Item elevation={3}>
            <center>
                          <p1>
                            Tamanho do Sedimento da praia (Percentagem %){" "}
                          </p1>
                          <RadialChart
                            data={this.state.Tamanho_sedimentos}
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
                            { title: "<=1mm", color: "#79C7E3" },
                            { title: "1-2mm", color: "#FF9833" },
                            { title: "2-4mm", color: "#1A3177" },
                            { title: ">4mm", color: "#12939A" },
                          ]}
                        />
            </Item>
          </Box>
        )
    }
}

const mapStateToprops = state => ({
  resultadoareiagranulometrias: state.resultadoareiagranulometrias,
});


export default connect(mapStateToprops, {retrieveResultadoAreiaGranulometrias,})(GraficoTamanhoSedimento);