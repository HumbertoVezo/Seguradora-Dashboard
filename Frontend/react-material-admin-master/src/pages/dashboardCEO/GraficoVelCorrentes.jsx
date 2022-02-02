import { Component } from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Select from "react-select";
import { retrieveCorrentelitoraneas } from "../../../conection/correnteslitoraneas/actions";

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

class GraficoVelCorrentes extends Component{
    constructor(props) {
        super(props);
        const year = new Date().getFullYear();
        this.years = Array.from(new Array(50), (val, index) => index + year);

        this.state = {
            selectOptions: [],
            thisYear: new Date().getFullYear(),
            selectedYear: new Date().getFullYear(),
            data_medicao_colitoranea: [
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
                { x: 'Dezembro', y: null },],
        };
    }
    componentDidMount() {
        this.props.retrieveCorrentelitoraneas();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.praiaId !== this.props.praiaId) {
            this.onHandleChange(this.props.praiaId)
        }
    }

    onHandleChange = (praiaId) => {
        const correntes = this.props.correntelitoraneas.filter(resultado => resultado.praia.id === praiaId)
        console.log(correntes)

        let valor1 = 0
        let valor2 = 0
        let Soma1 = 0
        let Media1 = 0
        let X = 0
        let valor3 = 0
        let valor4 = 0
        let Soma2 = 0
        let Media2 = 0
        let X1 = 0
        correntes.map(e => {
            if (moment(e.date).format('MMMM YYYY') == 'January 2022') {
                X= +1
                valor1 = valor1 + e.spoed_after_5_minutes
                valor2 = valor2 + e.spoed_after_5_minutes
                Soma1 = valor1 + valor2
                Media1 = Soma1 / X
            } else if (moment(e.date).format('MMMM YYYY') == 'February 2022') {
                X = +1
                valor3 = valor3 + e.spoed_after_5_minutes
                valor4 = valor4 + e.spoed_after_1_minute
                Soma2 = valor3 + valor4
                Media2 = Soma2 / X1
            }
        })
        this.setState({
            data_medicao_colitoranea: [{ x: 'Janeiro', y: Media1 }, { x: 'Fevereiro', y: Media2 }, { x: 'Março', y: null }, { x: 'Abril', y: null }, { x: 'Maio', y: null },
            { x: 'Junho', y: null }, { x: 'Julho', y: null }, { x: 'Agosto', y: null }, { x: 'Setembro', y: null }, { x: 'Outubro', y: null }, { x: 'Novembro', y: null }, { x: 'Dezembro', y: null },]
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
            <Box  gridColumn="span 12" sx={{ flexGrow: 1 }}>

                <Item elevation={3}>
                    <p1>Gráfico de barras das variações de
                       velocidade de correntes litorâneas ao longo do tempo</p1>
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
                        <YAxis title="Velocidade(m/s)" />
                        <HorizontalGridLines />
                        <XAxis tickLabelAngle={-28} />
                        <VerticalBarSeries
                            cluster="2016"
                            data={[{ x: '', y: '' }, ...this.state.data_medicao_colitoranea]}
                        />
                    </XYPlot></center> </Item>
            </Box>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        correntelitoraneas: state.correnteslitoraneas,
    };
};
export default connect(mapStateToProps, {
    retrieveCorrentelitoraneas
})(GraficoVelCorrentes);
