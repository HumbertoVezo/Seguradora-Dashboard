import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import { updatePaciente } from "../../connections/pacientes/actions";
import { Redirect } from "react-router-dom";
import Select from 'react-select';
import PacientesService from "../../connections/pacientes/PacientesService";
import axios from "axios";


class EditPaciente extends Component {
  constructor(props) {

    super(props);

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeIdentificacao = this.onChangeIdentificacao.bind(this);
    this.onChangeMorada = this.onChangeMorada.bind(this);
    this.onChangeTelefone = this.onChangeTelefone.bind(this);
    this.onChangeDataNasc = this.onChangeDataNasc.bind(this);
    this.handleChangeSexo = this.handleChangeSexo.bind(this);
    this.handleChangeDoc = this.handleChangeDoc.bind(this);
    this.savePaciente = this.savePaciente.bind(this);

    this.state = {

      currentPaciente: {

        nome: "",
        cod_doc: "",
        telemovel: "",
        morada: "",
        data_nasc: "",

        sexo: "",
        selectOptionsSexo: [],
        tipo_sexo: "",

        doc: "",
        selectOptionsDoc: [],
        tipo_doc: "",

        id: "",

      },

      redirect: false,

    };

  }

  async getOptionsSexo() {
    const sexo = await axios.get("http://localhost:1337/sexos");

    const data = sexo.data;

    const options = data.map((e) => ({
      value: e.id,
      label: e.tipo_sexo,
    }));

    this.setState({ selectOptionsSexo: options });
  }

  handleChangeSexo(e) {
    console.log(e.value);
    this.setState({ sexo: e.value, tipo_sexo: e.label });
    console.log(e);
  }

  async getOptionsDoc() {
    const doc = await axios.get("http://localhost:1337/docs");

    const data = doc.data;

    const options = data.map((e) => ({
      value: e.id,
      label: e.tipo_doc,
    }));

    this.setState({ selectOptionsDoc: options });
  }

  handleChangeDoc(e) {
    console.log(e.value);
    this.setState({ doc: e.value, tipo_doc: e.label });
    console.log(e);
  }

  componentDidMount() {
    this.getPaciente(this.props.match.params.id);
    this.getOptionsSexo();
    this.getOptionsDoc();
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPaciente: {
          ...prevState.currentPaciente,

          nome: nome,
        },
      };
    });
  }

  onChangeIdentificacao(e) {
    const cod_doc = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPaciente: {
          ...prevState.currentPaciente,

          cod_doc: cod_doc,
        },
      };
    });
  }

  onChangeMorada(e) {
    const morada = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPaciente: {
          ...prevState.currentPaciente,

          morada: morada,
        },
      };
    });
  }

  onChangeTelefone(e) {
    const telemovel = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPaciente: {
          ...prevState.currentPaciente,

          telemovel: telemovel,
        },
      };
    });
  }

  onChangeDataNasc(e) {
    const data_nasc = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPaciente: {
          ...prevState.currentPaciente,

          data_nasc: data_nasc,
        },
      };
    });
  }

  getPaciente(id) {
    PacientesService.get(id).then((response) => {
      this.setState({

        currentPaciente: response.data,

      });
    });
  }

  savePaciente() {
    this.props
      .updatePaciente(this.state.currentPaciente.id, this.state.currentPaciente)
      .then(() => {
        this.setState({

          redirect: true,
        });
      });
  }

  render() {
    const { redirect, currentPaciente } = this.state;

    if (redirect) {

      return <Redirect to="/app/list-paciente" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Editar Dados de Paciente</h1>
                <CardBody>
                  <Form>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="nome">Nome</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="nome"
                        required
                        value={currentPaciente.nome}
                        onChange={this.onChangeNome}
                        name="nome"

                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="doc">
                        Tipo de Documento ( o selecionado é{" "}
                        <strong>
                          {currentPaciente.doc.tipo_doc}
                        </strong>
                        <strong>{this.state.tipo_doc}</strong> )
                      </Label>
                      <Select
                        options={this.state.selectOptionsDoc}
                        defaultValue={currentPaciente.doc.tipo_doc}
                        onChange={this.handleChangeDoc}
                        id="doc"
                        name="doc"
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="cod_doc">Identificacao</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="cod_doc"
                        required
                        value={currentPaciente.cod_doc}
                        onChange={this.onChangeIdentificacao}
                        name="cod_doc"

                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="morada">Morada</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="morada"
                        required
                        value={currentPaciente.morada}
                        onChange={this.onChangeMorada}
                        name="morada"

                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="telemovel">Telefone</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="telemovel"
                        required
                        value={currentPaciente.telemovel}
                        onChange={this.onChangeTelefone}
                        name="telemovel"

                      />

                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="data_nasc">Data de Nascimento</Label>

                      <Input
                        className="form-control"
                        type="date"
                        id="data_nasc"
                        name="data_nasc"
                        value={currentPaciente.data_nasc}
                        onChange={this.onChangeDataNasc}
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="sexo">
                        Genero ( o selecionado é{" "}
                        <strong>
                          {currentPaciente.sexo.tipo_sexo}
                        </strong>
                        <strong>{this.state.tipo_sexo}</strong> )
                      </Label>
                      <Select
                        options={this.state.selectOptionsSexo}
                        defaultValue={currentPaciente.sexo.tipo_sexo}
                        onChange={this.handleChangeSexo}
                        id="sexo"
                        name="sexo"
                      />
                    </FormGroup>
                    
                    <Button onClick={this.savePaciente} className="btn btn-success">Editar</Button>
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
export default connect(null, { updatePaciente })(EditPaciente);