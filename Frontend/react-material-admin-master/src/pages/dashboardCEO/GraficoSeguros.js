import { Box } from "@mui/system";
import { Component } from "react";
import { DiscreteColorLegend, HorizontalGridLines, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { connect } from "react-redux";
import { retrieveSeguros } from "../../connections/seguros/actions";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderColor: "black",
}));

const minOffset = 0;
const maxOffset = 10;

function getSeguros(pago, naopago) {
  return [
    { x: "Pago", y: pago },
    { x: "Não Pago", y: naopago },
  ]
}

function initialValues(month) {
  return {
    quantPago: 0,
    quantNaoPago: 0,
  }
}

class GraficoSeguros extends Component {
  constructor(props) {
    super(props);

    const year = new Date().getFullYear();
    this.years = Array.from(new Array(50), (val, index) => index + year);

    this.state = {
      currentPraia: null,
      thisYear: new Date().getFullYear(),
      selectedYear: new Date().getFullYear(),
      segurosJan: getSeguros(0, 0),
      segurosFev: getSeguros(0, 0),
      segurosMar: getSeguros(0, 0),
      segurosAbr: getSeguros(0, 0),
      segurosMai: getSeguros(0, 0),
      segurosJun: getSeguros(0, 0),
      segurosJul: getSeguros(0, 0),
      segurosAgo: getSeguros(0, 0),
      segurosSet: getSeguros(0, 0),
      segurosOut: getSeguros(0, 0),
      segurosNov: getSeguros(0, 0),
      segurosDec: getSeguros(0, 0),
      january: initialValues(),
      february: initialValues(),
      march: initialValues(),
      april: initialValues(),
      may: initialValues(),
      june: initialValues(),
      july: initialValues(),
      august: initialValues(),
      september: initialValues(),
      november: initialValues(),
      october: initialValues(),
      december: initialValues(),

    };
    //this.SumSeguros = this.SumSeguros.bind(this);
  }


  componentDidMount() {
    this.props.retrieveSeguros();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.seguradoId !== this.props.seguradoId) {
      this.handleSeguros(this.props.seguradoId)
    }

    if (prevState.january !== this.state.january) {
      this.UpdateSeguroState('Jan', 'january');
    }
    if (prevState.february !== this.state.february) {
      this.UpdateSeguroState('Fev', 'february');
    }

    if (prevState.march !== this.state.march) {
      this.UpdateSeguroState('Mar', 'march');
    }
    if (prevState.april !== this.state.april) {
      this.UpdateSeguroState('Abr', 'april');
    }
    if (prevState.may !== this.state.may) {
      this.UpdateSeguroState('Mai', 'may');
    }
    if (prevState.june !== this.state.june) {
      this.UpdateSeguroState('Jun', 'june');
    }
    if (prevState.july !== this.state.july) {
      this.UpdateSeguroState('Jul', 'july');
    }
    if (prevState.august !== this.state.august) {
      this.UpdateSeguroState('Ago', 'august');
    }
    if (prevState.september !== this.state.september) {
      this.UpdateSeguroState('Set', 'september');
    }
    if (prevState.october !== this.state.october) {
      this.UpdateSeguroState('Out', 'october');
    }
    if (prevState.november !== this.state.november) {
      this.UpdateSeguroState('Nov', 'november');
    }
    if (prevState.december !== this.state.december) {
      this.UpdateSeguroState('Dec', 'december');
    }

  }


  handleSeguros(seguradoId) {

    const resultadoSeguros = this.props.seguros.filter(
      (seguro) => seguro.segurado.id === seguradoId
    );

    this.InitStates();

    resultadoSeguros.forEach((item) => {
      this.HandleMonth(item)

    });
  }

  DateHandleSeguros(event) {
    const resultadoSeguros = this.props.seguros.filter(
      (seguro) => seguro.segurado.id === this.props.seguradoId
    );

    this.InitStates();

    resultadoSeguros.forEach((item) => {

      if (moment(item.date).format("YYYY") === event.target.value) {
        this.HandleMonth(item)
      }
    }
    );

  }

  HandleMonth(item) {

    this.CheckMonth(item, 'January');
    this.CheckMonth(item, 'February');
    this.CheckMonth(item, 'March');
    this.CheckMonth(item, 'April');
    this.CheckMonth(item, 'May');
    this.CheckMonth(item, 'June');
    this.CheckMonth(item, 'July');
    this.CheckMonth(item, 'August');
    this.CheckMonth(item, 'september');
    this.CheckMonth(item, 'October');
    this.CheckMonth(item, 'November');
    this.CheckMonth(item, 'December');
  }

  CheckMonth = (item, month) => {

    if (moment(item.date).format("MMMM") === month) {
      this.CheckSeguro(item, month, 'quantPago', "Pago");
      this.CheckSeguro(item, month, 'quantNaoPago', "NaoPago");
    }
  }

  CheckSeguro(item, month, descQuant, seguro) {
    if (item.seguro.estado.situacao === seguro) {
      this.SumSeguros(month.toLowerCase(), descQuant, item.quantity);
    }
  }

  InitStates() {
    this.InitializeSeguroState('Jan');
    this.InitializeSeguroState('Fev');
    this.InitializeSeguroState('Mar');
    this.InitializeSeguroState('Abr');
    this.InitializeSeguroState('Mai');
    this.InitializeSeguroState('Jun');
    this.InitializeSeguroState('Jul');
    this.InitializeSeguroState('Ago');
    this.InitializeSeguroState('Set');
    this.InitializeSeguroState('Out');
    this.InitializeSeguroState('Nov');
    this.InitializeSeguroState('Dec');
  }

  UpdateSeguroState(month2, month) {
    this.setState({
      [`seguros${month2}`]: getSeguros(this.state[month].quantPago, this.state[month].quantNaoPago)
    });
  }

  InitializeSeguroState(month) {
    this.setState({
      [`seguros${month}`]: getSeguros(0, 0)
    });
  }

  SumSeguros(month, seguro, value) {
    this.setState(prevState => ({
      [month]: {
        ...prevState[month],
        [seguro]: prevState[month][seguro] + value
      }
    }))
  }
  render() {

    const { thisYear, segurosJan, segurosFev, segurosAbr, segurosAgo,
      segurosDec, segurosJul, segurosJun, segurosMai, segurosMar,
      segurosNov, segurosOut, segurosSet } = this.state;
    const options = [];

    const barData = [
      {
        cluster: 'Jan',
        color: "#12939A",
        data: [{ x: '', y: '' }, ...segurosJan]
      },
      {
        cluster: 'Fev',
        color: "#79C7E3",
        data: [{ x: '',y: '' }, ...segurosFev]
      },
      {
        cluster: 'Mar',
        color: "#ff0000",
        data: [{ x: '' ,y: ''}, ...segurosMar]
      },
      {
        cluster: 'Apr',
        color: "#800000",
        data: [{ x: '' ,y: ''}, ...segurosAbr]
      },
      {
        cluster: 'Mai',
        color: "#800080",
        data: [{ x: '' ,y: ''}, ...segurosMai]
      },
      {
        cluster: 'Jun',
        color: "#ffa500",
        data: [{ x: '' ,y: ''}, ...segurosJun]
      },

      {
        cluster: 'Jul',
        color: "#008000",
        data: [{ x: '' ,y: ''}, ...segurosJul]
      },
      {
        cluster: 'Aug',
        color: "#00ff00",
        data: [{ x: '' ,y: ''}, ...segurosAgo]
      },
      {
        cluster: 'Set',
        color: "#808000",
        data: [{ x: '' ,y: ''}, ...segurosSet]
      },
      {
        cluster: 'Out',
        color: "#a54850",
        data: [{ x: '' ,y: ''}, ...segurosOut]
      },
      {
        cluster: 'Nov',
        color: "#000080",
        data: [{ x: '' ,y: ''}, ...segurosNov]
      },
      {
        cluster: 'Dec',
        color: "#0000ff",
        data: [{ x: '' ,y: ''}, ...segurosDec]
      },
    ]


    let array = [];
    barData.map(item => {

      const data = item.data.reduce((acc, element) => {
          
            const exists = acc.find(it => it.title === item.cluster)
          
             if(!exists) {
              
               if(element.y) {
                  acc.push({
                    title: item.cluster,
                    color: item.color
                  })
               }
            }     
         return acc;
      },[])  
     array = [...array, ...data]
  })


    
    for (let i = minOffset; i <= maxOffset; i++) {
      const year = thisYear - i;
      options.push(<option value={year}>{year}</option>);
    }

    return (
      <Box gridColumn="span 12">
        <Item elevation={3}>
          <p1>Seguros (Quantidade)</p1>
          <div className="col-lg-2">
            <select
              options={this.selectedYear}
              onChange={this.DateHandleSeguros.bind(this)}
            >
              {options}
            </select>{" "}
          </div>
          <center>
            <XYPlot
              className="clustered-stacked-bar-chart-example"
              xType="ordinal"
              width= {1000}
              height={314}
            >
              <DiscreteColorLegend
                style={{
                  position: 'absolute',
                  top: "-60px",
                  left: '0',
                  right: '0',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
                orientation="horizontal"
               items={array}
              />

              <YAxis title="Quantidade" />
              <HorizontalGridLines />
             
              <XAxis />

              {
                barData.map(item => (
                  <VerticalBarSeries
                    cluster={item.cluster}
                    data={item.data}
                    color={item.color}
                   
                  />
                ))
              }
            </XYPlot>
          </center>
        </Item>
      </Box>
    )
  }
}


const mapStateToprops = state => ({
  seguros: state.seguros
});


export default connect(mapStateToprops, { retrieveSeguros })(GraficoSeguros);
