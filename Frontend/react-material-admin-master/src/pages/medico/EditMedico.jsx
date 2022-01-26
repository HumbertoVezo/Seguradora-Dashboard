import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import { updateMedico } from "../../connections/medicos/actions";
import { Redirect } from "react-router-dom";
import Select from 'react-select';
import MedicosService from "../../connections/medicos/MedicosService";
import axios from "axios";


class EditMedico extends Component {
  constructor(props) {

    super(props);

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeIdentificacao = this.onChangeIdentificacao.bind(this);
    this.onChangeMorada = this.onChangeMorada.bind(this);
    this.onChangeTelemovel = this.onChangeTelemovel.bind(this);
    this.onChangeDataNasc = this.onChangeDataNasc.bind(this);
    this.handleChangeSexo = this.handleChangeSexo.bind(this);
    this.handleChangeEspecialidade = this.handleChangeEspecialidade.bind(this);
    this.handleChangeDoc = this.handleChangeDoc.bind(this);
    this.saveMedico = this.saveMedico.bind(this);

    this.state = {

      currentMedico: {

        nome: "",
        cod_doc: "",
        telemovel: "",
        morada: "",
        data_nasc: "",

        sexo: "",
        selectOptionsSexo: [],
        tipo_sexo: "",

        especialidade: "",
        selectOptionsEspecialidade: [],
        tipo: "",

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

  async getOptionsEspecialidade() {
    const especialidade = await axios.get("http://localhost:1337/especialidades");

    const data = especialidade.data;

    const options = data.map((e) => ({
      value: e.id,
      label: e.tipo,
    }));

    this.setState({ selectOptionsEspecialidade: options });
  }

  handleChangeEspecialidade(e) {
    console.log(e.value);
    this.setState({ especialidade: e.value, tipo: e.label });
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
    this.getMedico(this.props.match.params.id);
    this.getOptionsSexo();
    this.getOptionsEspecialidade();
    this.getOptionsDoc();
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMedico: {
          ...prevState.currentMedico,

          nome: nome,
        },
      };
    });
  }

  onChangeIdentificacao(e) {
    const cod_doc = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMedico: {
          ...prevState.currentMedico,

          cod_doc: cod_doc,
        },
      };
    });
  }

  onChangeMorada(e) {
    const morada = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMedico: {
          ...prevState.currentMedico,

          morada: morada,
        },
      };
    });
  }

  onChangeTelemovel(e) {
    const telemovel = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMedico: {
          ...prevState.currentMedico,

          telemovel: telemovel,
        },
      };
    });
  }

  onChangeDataNasc(e) {
    const data_nasc = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMedico: {
          ...prevState.currentMedico,

          data_nasc: data_nasc,
        },
      };
    });
  }

  getMedico(id) {
    console.log(id)
    MedicosService.get(id).then((response) => {
      this.setState({

        currentMedico: response.data,

      });
    });
  }

  saveMedico() {
    this.props
      .updateMedico(this.state.currentMedico.id, this.state.currentMedico)
      .then(() => {
        this.setState({

          redirect: true,
        });
      });
  }

  render() {
    const { redirect, currentMedico } = this.state;

    if (redirect) {

      return <Redirect to="/app/list-medico" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Editar Dados de Medico</h1>
                <CardBody>
                  <Form>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="nome">Nome</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="nome"
                        required
                        value={currentMedico.nome}
                        onChange={this.onChangeNome}
                        name="nome"

                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="doc">
                        Tipo de Documento ( o selecionado é{" "}
                        <strong>
                          {currentMedico.doc.tipo_doc}
                        </strong>
                        <strong>{this.state.tipo_doc}</strong> )
                      </Label>
                      <Select
                        options={this.state.selectOptionsDoc}
                        defaultValue={currentMedico.doc.tipo_doc}
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
                        value={currentMedico.cod_doc}
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
                        value={currentMedico.morada}
                        onChange={this.onChangeMorada}
                        name="morada"

                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="telemovel">Telemovel</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="telemovel"
                        required
                        value={currentMedico.telemovel}
                        onChange={this.onChangeTelemovel}
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
                        value={currentMedico.data_nasc}
                        onChange={this.onChangeDataNasc}
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="sexo">
                        Genero ( o selecionado é{" "}
                        <strong>
                          {currentMedico.sexo.tipo_sexo}
                        </strong>
                        <strong>{this.state.tipo_sexo}</strong> )
                      </Label>
                      <Select
                        options={this.state.selectOptionsSexo}
                        defaultValue={currentMedico.sexo.tipo_sexo}
                        onChange={this.handleChangeSexo}
                        id="sexo"
                        name="sexo"
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="especialidade">
                        Tipo de Especialidade ( o selecionado é{" "}
                        <strong>
                          {currentMedico.especialidade.tipo}
                        </strong>
                        <strong>{this.state.tipo}</strong> )
                      </Label>
                      <Select
                        options={this.state.selectOptionsEspecialidade}
                        defaultValue={currentMedico.especialidade.tipo}
                        onChange={this.handleChangeEspecialidade}
                        id="especialidade"
                        name="especialidade"
                      />
                    </FormGroup>
                    <Button onClick={this.saveMedico} className="btn btn-success">Editar</Button>
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
export default connect(null, { updateMedico })(EditMedico);