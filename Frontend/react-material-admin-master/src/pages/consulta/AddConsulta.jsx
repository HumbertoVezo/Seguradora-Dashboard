import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import Select from 'react-select';
import { createConsulta } from "../../connections/consultas/actions";
import { Redirect } from "react-router-dom";
import axios from "axios";


class AddConsulta extends Component {
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
    this.getOptionsMedico();
    this.getOptionsPaciente();
    this.getOptionsServico();
  }

  onChangeSintoma(e) {

    this.setState({

      sintoma: e.target.value,

    });

  }

  onChangePreco(e) {

    this.setState({

      preco: e.target.value,

    });

  }

  onChangeData(e) {

    this.setState({

      data: e.target.value,

    });

  }

  saveConsulta() {

    const {
      sintoma,
      data,
      preco,
      medico,
      paciente,
      servico,
    } = this.state;

    this.props
      .createConsulta(
        sintoma,
        data,
        preco,
        [medico],
        [paciente],
        [servico],
      ).then(() => {

        this.setState({

          redirect: true,

        });

      });

  }

  render() {
    const { redirect } = this.state;

    if (redirect) {

      return <Redirect to="/app/list-consulta" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Adicionar Consulta</h1>
                <CardBody>
                  <Form>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="paciente">Paciente</Label>

                      <Select
                        options={this.state.selectOptionsPaciente}
                        onChange={this.handleChangePaciente.bind(this)}
                        id="paciente"
                        name="paciente"
                        required
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="sintoma">Sintoma</Label>

                      <Input

                        type="textarea"
                        className="form-control"
                        id="sintoma"
                        required
                        value={this.state.sintoma}
                        onChange={this.onChangeSintoma}
                        name="sintoma"

                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="servico">Tipo de Consulta</Label>

                      <Select
                        options={this.state.selectOptionsServico}
                        onChange={this.handleChangeServico.bind(this)}
                        id="servico"
                        name="servico"
                        required
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
                        value={this.state.preco}
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
                        value={this.state.data}
                        onChange={this.onChangeData}
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="medico">Medico</Label>

                      <Select
                        options={this.state.selectOptionsMedico}
                        onChange={this.handleChangeMedico.bind(this)}
                        id="medico"
                        name="medico"
                        required
                      />
                    </FormGroup>
                    <Button onClick={this.saveConsulta} className="btn btn-success">Adicionar</Button>
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
export default connect(null, { createConsulta })(AddConsulta);