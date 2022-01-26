import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import Select from 'react-select';
import { createPaciente } from "../../connections/pacientes/actions";
import { Redirect } from "react-router-dom";
import axios from "axios";


class AddPaciente extends Component {
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

      nome: "",
      cod_doc: "",
      telefone: "",
      morada: "",
      data_nasc: "",

      sexo: "",
      selectOptionsSexo: [],
      tipo_sexo: "",

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

  onChangeTelefone(e) {

    this.setState({

      telefone: e.target.value,

    });

  }

  onChangeDataNasc(e) {

    this.setState({

      data_nasc: e.target.value,

    });

  }

  savePaciente() {

    const {
      nome,
      cod_doc,
      morada,
      telefone,
      data_nasc,
      sexo,
      doc,
    } = this.state;

    this.props
      .createPaciente(
        nome,
        cod_doc,
        morada,
        telefone,
        data_nasc,
        [sexo],
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

      return <Redirect to="/app/list-paciente" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Adicionar Paciente</h1>
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
                      <Label htmlFor="telefone">Telefone</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="telefone"
                        required
                        value={this.state.telefone}
                        onChange={this.onChangeTelefone}
                        name="telefone"

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
                      <Label htmlFor="sexo">Genero</Label>

                      <Select
                        options={this.state.selectOptionsSexo}
                        onChange={this.handleChangeSexo.bind(this)}
                        id="sexo"
                        name="sexo"
                        required
                      />
                    </FormGroup>
                    <Button onClick={this.savePaciente} className="btn btn-success">Adicionar</Button>
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
export default connect(null, { createPaciente })(AddPaciente);