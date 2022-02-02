import { Box } from "@mui/system";
import { Component } from "react";
import { DiscreteColorLegend, HorizontalGridLines, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { connect } from "react-redux";
import { retrieveDetritosPraias } from "../../../conection/detritosPraia/actions";
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

function getDetritos(madeira, plastico, vidro, papel, corda, natural, bolasDeAlcatrao, isopor, pontasDeCigarros, aluminio, borracha) {
  return [
    { x: "Madeira", y: madeira },
    { x: "Plástico", y: plastico },
    { x: "Vidro", y: vidro },
    { x: "Papel", y: papel },
    { x: "Corda", y: corda },
    { x: "Natural", y: natural },
    { x: "Bolas de alcatrão", y: bolasDeAlcatrao },
    { x: "Isopor", y: isopor },
    { x: "Pontas de cigarros", y: pontasDeCigarros },
    { x: "Alumínio", y: aluminio },
    { x: "Borracha", y: borracha },
  ]
}

function initialValues(month) {
  return {
    quantMadeira: 0,
    quantPlastico: 0,
    quantVidro: 0,
    quantPapel: 0,
    quantCorda: 0,
    quantNatural: 0,
    quantBolas: 0,
    quantIsopor: 0,
    quantPontas: 0,
    quantAluminio: 0,
    quantBoracha: 0
  }
}

class GraficoDetritos extends Component {
  constructor(props) {
    super(props);

    const year = new Date().getFullYear();
    this.years = Array.from(new Array(50), (val, index) => index + year);

    this.state = {
      currentPraia: null,
      thisYear: new Date().getFullYear(),
      selectedYear: new Date().getFullYear(),
      detritosJan: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosFev: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosMar: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosAbr: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosMai: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosJun: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosJul: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosAgo: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosSet: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosOut: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosNov: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      detritosDec: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
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
    this.SumDetritos = this.SumDetritos.bind(this);
  }


  componentDidMount() {
    this.props.retrieveDetritosPraias();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.praiaId !== this.props.praiaId) {
      this.handleDetritos(this.props.praiaId)
    }

    if (prevState.january !== this.state.january) {
      this.UpdateDetritoState('Jan', 'january');
    }
    if (prevState.february !== this.state.february) {
      this.UpdateDetritoState('Fev', 'february');
    }

    if (prevState.march !== this.state.march) {
      this.UpdateDetritoState('Mar', 'march');
    }
    if (prevState.april !== this.state.april) {
      this.UpdateDetritoState('Abr', 'april');
    }
    if (prevState.may !== this.state.may) {
      this.UpdateDetritoState('Mai', 'may');
    }
    if (prevState.june !== this.state.june) {
      this.UpdateDetritoState('Jun', 'june');
    }
    if (prevState.july !== this.state.july) {
      this.UpdateDetritoState('Jul', 'july');
    }
    if (prevState.august !== this.state.august) {
      this.UpdateDetritoState('Ago', 'august');
    }
    if (prevState.september !== this.state.september) {
      this.UpdateDetritoState('Set', 'september');
    }
    if (prevState.october !== this.state.october) {
      this.UpdateDetritoState('Out', 'october');
    }
    if (prevState.november !== this.state.november) {
      this.UpdateDetritoState('Nov', 'november');
    }
    if (prevState.december !== this.state.december) {
      this.UpdateDetritoState('Dec', 'december');
    }

  }


  handleDetritos(praiaId) {

    const resultadoDetritos = this.props.detritos.filter(
      (detrito) => detrito.praia.id === praiaId
    );

    this.InitStates();

    resultadoDetritos.forEach((item) => {
      this.HandleMonth(item)

    });
  }

  DateHandleDetritos(event) {
    const resultadoDetritos = this.props.detritos.filter(
      (detrito) => detrito.praia.id === this.props.praiaId
    );

    this.InitStates();

    resultadoDetritos.forEach((item) => {

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
      this.CheckDetrito(item, month, 'quantPlastico', "Plastico");
      this.CheckDetrito(item, month, 'quantPlastico', "Plastico");
      this.CheckDetrito(item, month, 'quantMadeira', "Madeira");
      this.CheckDetrito(item, month, 'quantVidro', "Vidro");
      this.CheckDetrito(item, month, 'quantPapel', "Papel");
      this.CheckDetrito(item, month, 'quantCorda', "Corda");
      this.CheckDetrito(item, month, 'quantNatural', "Natural");
      this.CheckDetrito(item, month, 'quantIsopor', "Isopor(esferovite)");
      this.CheckDetrito(item, month, 'quantAluminio', "Alumínio");
      this.CheckDetrito(item, month, 'quantBoracha', "Borracha");
      this.CheckDetrito(item, month, 'quantBolas', "Bolas de alcatrão");
      this.CheckDetrito(item, month, 'quantPontas', "Pontas de cigarros");

    }
  }

  CheckDetrito(item, month, descQuant, detrito) {
    if (item.detrito.name_detrito === detrito) {
      this.SumDetritos(month.toLowerCase(), descQuant, item.quantity);
    }
  }

  InitStates() {
    this.InitializeDetritoState('Jan');
    this.InitializeDetritoState('Fev');
    this.InitializeDetritoState('Mar');
    this.InitializeDetritoState('Abr');
    this.InitializeDetritoState('Mai');
    this.InitializeDetritoState('Jun');
    this.InitializeDetritoState('Jul');
    this.InitializeDetritoState('Ago');
    this.InitializeDetritoState('Set');
    this.InitializeDetritoState('Out');
    this.InitializeDetritoState('Nov');
    this.InitializeDetritoState('Dec');
  }

  UpdateDetritoState(month2, month) {
    this.setState({
      [`detritos${month2}`]: getDetritos(this.state[month].quantMadeira, this.state[month].quantPlastico,
        this.state[month].quantVidro, this.state[month].quantPapel, this.state[month].quantCorda,
        this.state[month].quantNatural, this.state[month].quantBolas, this.state[month].quantIsopor,
        this.state[month].quantPontas, this.state[month].quantAluminio, this.state[month].quantBoracha)
    });
  }

  InitializeDetritoState(month) {
    this.setState({
      [`detritos${month}`]: getDetritos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    });
  }

  SumDetritos(month, detrito, value) {
    this.setState(prevState => ({
      [month]: {
        ...prevState[month],
        [detrito]: prevState[month][detrito] + value
      }
    }))
  }
  render() {

    const { thisYear, detritosJan, detritosFev, detritosAbr, detritosAgo,
      detritosDec, detritosJul, detritosJun, detritosMai, detritosMar,
      detritosNov, detritosOut, detritosSet } = this.state;
    const options = [];

    const barData = [
      {
        cluster: 'Jan',
        color: "#12939A",
        data: [{ x: '', y: '' }, ...detritosJan]
      },
      {
        cluster: 'Fev',
        color: "#79C7E3",
        data: [{ x: '',y: '' }, ...detritosFev]
      },
      {
        cluster: 'Mar',
        color: "#ff0000",
        data: [{ x: '' ,y: ''}, ...detritosMar]
      },
      {
        cluster: 'Apr',
        color: "#800000",
        data: [{ x: '' ,y: ''}, ...detritosAbr]
      },
      {
        cluster: 'Mai',
        color: "#800080",
        data: [{ x: '' ,y: ''}, ...detritosMai]
      },
      {
        cluster: 'Jun',
        color: "#ffa500",
        data: [{ x: '' ,y: ''}, ...detritosJun]
      },

      {
        cluster: 'Jul',
        color: "#008000",
        data: [{ x: '' ,y: ''}, ...detritosJul]
      },
      {
        cluster: 'Aug',
        color: "#00ff00",
        data: [{ x: '' ,y: ''}, ...detritosAgo]
      },
      {
        cluster: 'Set',
        color: "#808000",
        data: [{ x: '' ,y: ''}, ...detritosSet]
      },
      {
        cluster: 'Out',
        color: "#a54850",
        data: [{ x: '' ,y: ''}, ...detritosOut]
      },
      {
        cluster: 'Nov',
        color: "#000080",
        data: [{ x: '' ,y: ''}, ...detritosNov]
      },
      {
        cluster: 'Dec',
        color: "#0000ff",
        data: [{ x: '' ,y: ''}, ...detritosDec]
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
          <p1>Detritos (Quantidade)</p1>
          <div className="col-lg-2">
            <select
              options={this.selectedYear}
              onChange={this.DateHandleDetritos.bind(this)}
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
  detritos: state.detritosPraias
});


export default connect(mapStateToprops, { retrieveDetritosPraias })(GraficoDetritos);
