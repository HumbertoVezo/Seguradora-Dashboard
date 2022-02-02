
import { retrieveMedicaoondas } from "../../../conection/medicaoondas/actions";
import moment from "moment";
import Box from "@mui/material/Box";
import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries,
} from "react-vis";
import { Item } from "./Item";
const minOffset = 0;
const maxOffset = 60;

class GraficoOndas extends Component {
    constructor(props) {
        super(props);

        const year = new Date().getFullYear();
        this.years = Array.from(new Array(50), (val, index) => index + year);

        this.state = {
            selectOptions: [],
            thisYear: new Date().getFullYear(),
            selectedYear: new Date().getFullYear(),
            data_medicao_onda: [
                { x: 'Janeiro', y: null },
                { x: 'Fevereiro', y: null },
                { x: 'Março', y: null },
                { x: 'Abril', y: null },
                { x: 'Maio', y: null },
                { x: 'Junho', y: null },
                { x: 'Julho', y: null },
                { x: 'Agosto', y: null },
                { x: 'Setembro', y: null },
                { x: 'Outubro', y: null },
                { x: 'Novembro', y: null },
                { x: 'Dezembro', y: null },]
        };
    }

    componentDidMount() {
        this.props.retrieveMedicaoondas();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.praiaId !== this.props.praiaId) {
            this.onHandleChange(this.props.praiaId)
        }
    }
    onHandleChange = (praiaId) => {
        const resultado1 = this.props.medicaoondas.filter(resultado => resultado.praia.id === praiaId)
        console.log(resultado1)
        let valor1 = 0
        let valor2 = 0
        let valor3 = 0
        let valor4 = 0
        let valor5 = 0
        let valor6 = 0
        let valor7 = 0
        let valor8 = 0
        let valor9 = 0
        let valor10 = 0
        let valor11 = 0
        let valor12 = 0

        resultado1.map(e => {
            if (moment(e.date).format('MMMM') == 'January') {
                valor1 = e.wave_heigth
            } else if (moment(e.date).format('MMMM') == 'February') {
                valor2 += e.wave_heigth
            }
            else if (moment(e.date).format('MMMM') == 'March') {
                valor3 += e.wave_heigth
            } else if (moment(e.date).format('MMMM') == 'April') {
                valor4 += e.wave_heigth
            } else if (moment(e.date).format('MMMM') == 'May') {
                valor4 += e.wave_heigth
            }
            else if (moment(e.date).format('MMMM') == 'June') {
                valor6 += e.wave_heigth
            } else if (moment(e.date).format('MMMM') == 'July') {
                valor7 += e.wave_heigth
            } else if (moment(e.date).format('MMMM') == ' August') {
                valor8 += e.wave_heigth
            } else if (moment(e.date).format('MMMM') == 'September') {
                valor9 += e.wave_heigth
            } else if (moment(e.date).format('MMMM') == 'October') {
                valor10 += e.wave_heigth
            } else if (moment(e.date).format('MMMM YYYY') == 'November') {
                valor11 += e.wave_heigth
            } else if (moment(e.date).format('MMMM YYYY') == 'December') {
                valor12 += e.wave_heigth
            }

        })

        this.setState({
            data_medicao_onda: [{ x: 'Janeiro', y: valor1 }, { x: 'Fevereiro', y: valor2 }, { x: 'Março', y: valor3 }, { x: 'Abril', y: valor4 }, { x: 'Maio', y: valor5 },
            { x: 'Junho', y: valor6 }, { x: 'Julho', y: valor7 }, { x: 'Agosto', y: valor8 }, { x: 'Setembro', y: valor9 }, { x: 'Outubro', y: valor10 }, { x: 'Novembro', y: valor11 }, { x: 'Dezembro', y: valor12 },]
        })
    };
  

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
                        <p1>Gráfico de barras das variações de
                            altura das ondas ao longo do tempo</p1>

                        <div className="col-lg-2">
                            <select
                                options={this.selectedYear}
                                onChange={this.onHandleChange}>
                                {options}
                            </select> </div>
                        <center><XYPlot
                            className="clustered-stacked-bar-chart-example"
                            xType="ordinal"
                            color='#FABB51'
                            stroke='#F47340'
                            width={950}
                            height={350} >
                            <YAxis title="Altura(m)" />
                            <HorizontalGridLines />
                            <XAxis tickLabelAngle={-28} />
                            <VerticalBarSeries
                                cluster="2016"
                                data={[{ x: '', y: '' }, ...this.state.data_medicao_onda]}
                            />
                        </XYPlot></center> </Item>
                </Box>
          
        )

    }

}
const mapStateToProps = (state) => {
    return {
        medicaoondas: state.medicaoondas,
    };
};
export default connect(mapStateToProps, {
    retrieveMedicaoondas
})(GraficoOndas);