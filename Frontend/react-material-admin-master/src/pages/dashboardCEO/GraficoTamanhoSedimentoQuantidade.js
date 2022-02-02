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


class GraficoTamanhoSedimento extends Component {
    constructor(props) {
        super(props);

        this.state = {
          data_Tamanho_sedimentos: [
            { x: "<=1mm", y: null },
            { x: "1-2mm", y: null },
            { x: "2-4mm", y: null },
            { x: ">4mm", y: null },
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
         
        });
    
        this.setState({
          data_Tamanho_sedimentos: [
            { x: "<=1mm", y: ValorMenor1 },
            { x: "1-2mm", y: ValorEntre12 },
            { x: "2-4mm", y: ValorEntre23 },
            { x: ">4mm", y: ValorMaior4 },
          ],
        });

  }
   


   
    render() {

      
        return(
            <Box gridColumn="span 6">
            <Item elevation={3}>
            <p1>Tamanho dos Sedimentos das Praias (Quantidade)</p1>


                        <center>
                          <XYPlot
                            className="clustered-stacked-bar-chart-example"
                            xType="ordinal"
                            color="#B8E3FF"
                            stroke="#51ACC5"
                            width={450}
                            height={314}
                          >
                            <YAxis title="Quantidade" />
                            <HorizontalGridLines />
                            <XAxis />
                            <VerticalBarSeries
                              cluster="2016"
                              data={[
                                { x: "", y: "" },
                                ...this.state.data_Tamanho_sedimentos,
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



export default connect(mapStateToprops, {  retrieveResultadoAreiaGranulometrias,})(GraficoTamanhoSedimento);