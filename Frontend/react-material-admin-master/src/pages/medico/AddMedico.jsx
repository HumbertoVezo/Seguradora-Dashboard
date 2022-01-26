import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import Select from 'react-select';
import { createMedico } from "../../connections/medicos/actions";
import { Redirect } from "react-router-dom";
import axios from "axios";


class AddMedico extends Component {
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
    this.getOptionsSexo();
    this.getOptionsEspecialidade();
    this.getOptionsDoc();
  }

  onChangeNome(e) {

    this.setState({

      nome: e.target.value,

    });

  }

  onChangeIdentificacao(e) {

    this.setState({

      cod_doc: e.target.value,

    });

  }

  onChangeMorada(e) {

    this.setState({

      morada: e.target.value,

    });

  }

  onChangeTelemovel(e) {

    this.setState({

      telemovel: e.target.value,

    });

  }

  onChangeDataNasc(e) {

    this.setState({

      data_nasc: e.target.value,

    });

  }

  saveMedico() {

    const {
      nome,
      cod_doc,
      telemovel,
      morada,
      data_nasc,
      sexo,
      especialidade,
      doc,
    } = this.state;

    this.props
      .createMedico(
        nome,
        cod_doc,
        telemovel,
        morada,
        data_nasc,
        [sexo],
        [especialidade],
        [doc],
      ).then(() => {

        this.setState({

          redirect: true,

        });

      });

  }

  render() {
    const { redirect } = this.state;

    if (redirect) {

      return <Redirect to="/app/list-medico" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Adicionar Medico</h1>
                <CardBody>
                  <Form>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="nome">Nome Completo</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="nome"
                        required
                        value={this.state.nome}
                        onChange={this.onChangeNome}
                        name="nome"

                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="doc">Tipo de Documento</Label>

                      <Select
                        options={this.state.selectOptionsDoc}
                        onChange={this.handleChangeDoc.bind(this)}
                        id="doc"
                        name="doc"
                        required
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="cod_doc">Codigo do Documento</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="cod_doc"
                        required
                        value={this.state.cod_doc}
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
                        value={this.state.morada}
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
                        value={this.state.telemovel}
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
                        value={this.state.data_nasc}
                        onChange={this.onChangeDataNasc}
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="especialidade">Especialidade</Label>

                      <Select
                        options={this.state.selectOptionsEspecialidade}
                        onChange={this.handleChangeEspecialidade.bind(this)}
                        id="especialidade"
                        name="especialidade"
                        required
                      />
                    </FormGroup>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="sexo">Genero</Label>

                      <Select
                        options={this.state.selectOptionsSexo}
                        onChange={this.handleChangeSexo.bind(this)}
                        id="sexo"
                        name="sexo"
                        required
                      />
                    </FormGroup>
                    <Button onClick={this.saveMedico} className="btn btn-success">Adicionar</Button>
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
export default connect(null, { createMedico })(AddMedico);