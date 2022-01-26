import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import { createServico } from "../../connections/servicos/actions";
import { Redirect } from "react-router-dom";


class AddServico extends Component {
  constructor(props) {

    super(props);

    this.onChangeTipoServico = this.onChangeTipoServico.bind(this);
    this.saveServico = this.saveServico.bind(this);

    this.state = {

      tipo_servico: "",
      redirect: false,

    };

  }

  onChangeTipoServico(e) {

    this.setState({

      tipo_servico: e.target.value,

    });

  }

  saveServico() {

    const {
      tipo_servico,
      
    } = this.state;

    this.props
      .createServico(
        tipo_servico,
        
      ).then(() => {

        this.setState({

          redirect: true,

        });

      });

  }

  render() {
    const { redirect } = this.state;

    if (redirect) {

      return <Redirect to="/app/list-servico" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Adicionar Serviço</h1>
                <CardBody>
                  <Form>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="tipo_servico">Tipo Serviço Completo</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="tipo_servico"
                        required
                        value={this.state.tipo_servico}
                        onChange={this.onChangeTipoServico}
                        name="tipo_servico"

                      />
                    </FormGroup>
                  
                    <Button onClick={this.saveServico} className="btn btn-success">Adicionar</Button>
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
export default connect(null, { createServico })(AddServico);