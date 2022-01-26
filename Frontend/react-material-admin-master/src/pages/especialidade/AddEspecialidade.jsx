import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row, Input, Label} from 'reactstrap'
import { connect } from "react-redux";
import { createEspecialidade } from "../../connections/especialidades/actions";
import { Redirect } from "react-router-dom";



class AddEspecialidade extends Component {
  constructor(props) {

    super(props);

    this.onChangeTipoEspecialidade = this.onChangeTipoEspecialidade.bind(this);
    this.saveEspecialidade = this.saveEspecialidade.bind(this);

    this.state = {

      tipo: "",
      redirect: false,

    };

  }

  onChangeTipoEspecialidade(e) {

    this.setState({

      tipo: e.target.value,

    });

  }

  saveEspecialidade() {

    const {
      tipo,
      
    } = this.state;

    this.props
      .createEspecialidade(
        tipo,
        
      ).then(() => {

        this.setState({

          redirect: true,

        });

      });

  }

  render() {
    const { redirect } = this.state;

    if (redirect) {

      return <Redirect to="/app/list-especialidade" />;

    }
    return (
      <div>
        <Container>
          <Row>
            <Card>
              <Col>
                <h1>Adicionar especialidade</h1>
                <CardBody>
                  <Form>
                    <FormGroup style={{ padding: "1em" }}>
                      <Label htmlFor="tipo">Tipo de Especialidade</Label>

                      <Input

                        type="text"
                        className="form-control"
                        id="tipo"
                        required
                        value={this.state.tipo}
                        onChange={this.onChangeTipoEspecialidade}
                        name="tipo"

                      />
                    </FormGroup>
                  
                    <Button onClick={this.saveEspecialidade} className="btn btn-success">Adicionar</Button>
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
export default connect(null, { createEspecialidade })(AddEspecialidade);