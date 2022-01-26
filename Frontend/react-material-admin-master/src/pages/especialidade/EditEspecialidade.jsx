import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import { updateEspecialidade } from "../../connections/especialidades/actions";
import { Redirect } from "react-router-dom";
import EspecialidadesService from "../../connections/especialidades/EspecialidadesService";


class EditEspecialidade extends Component {
  constructor(props) {

    super(props);

    this.onChangeTipoEspecialidade = this.onChangeTipoEspecialidade.bind(this);
    this.saveEspecialidade = this.saveEspecialidade.bind(this);

    this.state = {

      currentEspecialidade: {

        tipo: "",
        
      },

      redirect: false,

    };

  }

  componentDidMount() {
    this.getEspecialidade(this.props.match.params.id);
  }

  onChangeTipoEspecialidade(e) {
    const tipo = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEspecialidade: {
          ...prevState.currentEspecialidade,

          tipo: tipo,
        },
      };
    });
  }

  getEspecialidade(id) {
    EspecialidadesService.get(id).then((response) => {
      this.setState({

        currentEspecialidade: response.data,

      });
    });
  }

  saveEspecialidade() {
    this.props
      .updateEspecialidade(this.state.currentEspecialidade.id, this.state.currentEspecialidade)
      .then(() => {
        this.setState({

          redirect: true,
        });
      });
  }

  render() {
    const { redirect, currentEspecialidade } = this.state;

    if (redirect) {

      return <Redirect to="/app/list-especialidade" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Editar Dados de especialidade</h1>
                <CardBody>
                  <Form>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="tipo_especialidade">Tipo de especialidade</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="tipo_especialidade"
                        required
                        value={currentEspecialidade.tipo_especialidade}
                        onChange={this.onChangeTipoEspecialidade}
                        name="tipo_especialidade"

                      />
                    </FormGroup>
                    
                    <Button onClick={this.saveEspecialidade} className="btn btn-success">Editar</Button>
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
export default connect(null, { updateEspecialidade })(EditEspecialidade);