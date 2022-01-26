import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import { updateConsulta } from "../../connections/consultas/actions";
import { Redirect } from "react-router-dom";
import Select from 'react-select';
import ConsultasService from "../../connections/consultas/ConsultasService";
import axios from "axios";

class EditConsulta extends Component {
  constructor(props) {

    super(props);

    this.onChangeSintoma = this.onChangeSintoma.bind(this);
    this.onChangePreco = this.onChangePreco.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.handleChangeMedico = this.handleChangeMedico.bind(this);
    this.handleChangePaciente = this.handleChangePaciente.bind(this);
    this.handleChangeServico = this.handleChangeServico.bind(this);
    this.saveConsulta = this.saveConsulta.bind(this);

    this.state = {

      currentConsulta: {

        sintoma: "",
        preco: "",
        data: "",

        medico: "",
        selectOptionsMedico: [],

        nome: "",

        paciente: "",
        selectOptionsPaciente: [],

        servico: "",
        selectOptionsServico: [],
        tipo_servico: "",

        id: "",

      },

      redirect: false,

    };

  }

  async getOptionsMedico() {
    const medico = await axios.get("http://localhost:1337/medicos");

    const data = medico.data;

    const options = data.map((e) => ({
      value: e.id,
      label: e.nome,
    }));

    this.setState({ selectOptionsMedico: options });
  }

  handleChangeMedico(e) {
    console.log(e.value);
    this.setState({ medico: e.value, nome: e.label });
    console.log(e);
  }

  async getOptionsPaciente() {
    const paciente = await axios.get("http://localhost:1337/pacientes");

    const data = paciente.data;

    const options = data.map((e) => ({
      value: e.id,
      label: e.nome,
    }));

    this.setState({ selectOptionsPaciente: options });
  }

  handleChangePaciente(e) {
    console.log(e.value);
    this.setState({ paciente: e.value, nome: e.label });
    console.log(e);
  }

  async getOptionsServico() {
    const servico = await axios.get("http://localhost:1337/servicos");

    const data = servico.data;

    const options = data.map((e) => ({
      value: e.id,
      label: e.tipo_servico,
    }));

    this.setState({ selectOptionsServico: options });
  }

  handleChangeServico(e) {
    console.log(e.value);
    this.setState({ servico: e.value, tipo_servico: e.label });
    console.log(e);
  }

  componentDidMount() {
    this.getConsulta(this.props.match.params.id);
    this.getOptionsMedico();
    this.getOptionsPaciente();
    this.getOptionsServico();
  }

  onChangeSintoma(e) {
    const sintoma = e.target.value;

    this.setState(function (prevState) {
      return {
        currentConsulta: {
          ...prevState.currentConsulta,

          sintoma: sintoma,
        },
      };
    });
  }

  onChangePreco(e) {
    const preco = e.target.value;

    this.setState(function (prevState) {
      return {
        currentConsulta: {
          ...prevState.currentConsulta,

          preco: preco,
        },
      };
    });
  }

  onChangeData(e) {
    const data = e.target.value;

    this.setState(function (prevState) {
      return {
        currentConsulta: {
          ...prevState.currentConsulta,

          data: data,
        },
      };
    });
  }

  getConsulta(id) {
    ConsultasService.get(id).then((response) => {
      this.setState({

        currentConsulta: response.data,

      });
    });
  }

  saveConsulta() {
    this.props
      .updateConsulta(this.state.currentConsulta.id, this.state.currentConsulta)
      .then(() => {
        this.setState({

          redirect: true,
        });
      });
  }

  render() {
    const { redirect, currentConsulta } = this.state;

    if (redirect) {

      return <Redirect to="/app/list-consulta" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Editar Dados de Consulta</h1>
                <CardBody>
                  <Form>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="paciente">
                        Paciente ( o selecionado é{" "}
                        <strong>
                          {currentConsulta.paciente.nome}
                        </strong>
                        <strong>{this.state.nome}</strong> )
                      </Label>
                      <Select
                        options={this.state.selectOptionsPaciente}
                        defaultValue={currentConsulta.paciente.nome}
                        onChange={this.handleChangePaciente}
                        id="paciente"
                        name="paciente"
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="sintoma">Sintoma</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="sintoma"
                        required
                        value={currentConsulta.sintoma}
                        onChange={this.onChangeSintoma}
                        name="sintoma"

                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="servico">
                        Tipo de Consulta ( o selecionado é{" "}
                        <strong>
                          {currentConsulta.servico.tipo_servico}
                        </strong>
                        <strong>{this.state.tipo_servico}</strong> )
                      </Label>
                      <Select
                        options={this.state.selectOptionsServico}
                        defaultValue={currentConsulta.servico.tipo_servico}
                        onChange={this.handleChangeServico}
                        id="servico"
                        name="servico"
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="preco">Preço (CVE)</Label>

                      <Input

                        type="number"
                        min={0}
                        className="form-control"
                        id="preco"
                        required
                        value={currentConsulta.preco}
                        onChange={this.onChangePreco}
                        name="preco"

                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="data">Data e Hora da Consulta</Label>

                      <Input
                        className="form-control"
                        type="datetime-local"
                        id="data"
                        name="data"
                        value={currentConsulta.data}
                        onChange={this.onChangeData}
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="medico">
                        Genero ( o selecionado é{" "}
                        <strong>
                          {currentConsulta.medico.nome}
                        </strong>
                        <strong>{this.state.nome}</strong> )
                      </Label>
                      <Select
                        options={this.state.selectOptionsMedico}
                        defaultValue={currentConsulta.medico.nome}
                        onChange={this.handleChangeMedico}
                        id="medico"
                        name="medico"
                      />
                    </FormGroup>
                    <Button onClick={this.saveConsulta} className="btn btn-success">Editar</Button>
                  </Form>
                </CardBody>
              </Col>
            </Card>
          </Row>
        </Container>
      </div>
    )
  }
}
export default connect(null, { updateConsulta })(EditConsulta);