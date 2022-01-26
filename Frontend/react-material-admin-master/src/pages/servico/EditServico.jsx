import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import { updateServico } from "../../connections/servicos/actions";
import { Redirect } from "react-router-dom";
import ServicosService from "../../connections/servicos/ServicosService";


class EditServico extends Component {
  constructor(props) {

    super(props);

    this.onChangeTipoServico = this.onChangeTipoServico.bind(this);
    this.saveServico = this.saveServico.bind(this);

    this.state = {

      currentServico: {

        tipo_servico: "",
        
      },

      redirect: false,

    };

  }

  componentDidMount() {
    this.getServico(this.props.match.params.id);
  }

  onChangeTipoServico(e) {
    const tipo_servico = e.target.value;

    this.setState(function (prevState) {
      return {
        currentServico: {
          ...prevState.currentServico,

          tipo_servico: tipo_servico,
        },
      };
    });
  }

  getServico(id) {
    ServicosService.get(id).then((response) => {
      this.setState({

        currentServico: response.data,

      });
    });
  }

  saveServico() {
    this.props
      .updateServico(this.state.currentServico.id, this.state.currentServico)
      .then(() => {
        this.setState({

          redirect: true,
        });
      });
  }

  render() {
    const { redirect, currentServico } = this.state;

    if (redirect) {

      return <Redirect to="/app/list-servico" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Editar Dados de Serviço</h1>
                <CardBody>
                  <Form>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="tipo_servico">Tipo Serviço</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="tipo_servico"
                        required
                        value={currentServico.tipo_servico}
                        onChange={this.onChangeTipoServico}
                        name="tipo_servico"

                      />
                    </FormGroup>
                    
                    <Button onClick={this.saveServico} className="btn btn-success">Editar</Button>
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
export default connect(null, { updateServico })(EditServico);