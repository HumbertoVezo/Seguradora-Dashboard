import React, { Component } from 'react'
import { Button, Row, Table, Label } from 'reactstrap';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveConsultas, deleteConsulta } from "../../connections/consultas/actions";
import Moment from 'react-moment';

class ConsultaList extends Component {
    componentDidMount() {

        this.props.retrieveConsultas();

    }

    removeConsulta = (id) => {

        this.props.deleteConsulta(id).then(() => {

            this.props.retrieveConsultas();

        });

    };

    render() {
        const { consultas } = this.props;

        return (
            <div>
                <h1 style={{ padding: "1em" }}>Lista de Consultas</h1>
                <div style={{ textAlign: 'left' }}>
                    <Link to="/app/add-consulta">

                        <Button color="primary">Adicionar</Button>

                    </Link>
                </div>
                <br />
                <Row>
                    <Table>
                        <thead>

                            <tr>

                                <th>#</th>

                                <th>Sintoma</th>

                                <th>Data e Hora</th>

                                <th>Preço</th>

                                <th>Medico</th>

                                <th>Paciente</th>

                                <th>Consulta</th>

                                <th>Ações</th>

                            </tr>

                        </thead>

                        <tbody>

                            {consultas &&

                                consultas.map(

                                    ({ id, sintoma, data, preco, medico, paciente, servico }, i) => (

                                        <tr key={i}>

                                            <td>{id}</td>

                                            <td>{sintoma}</td>

                                            <td><Moment format="DD/MM/YYYY hh:mm:ss">{data}</Moment></td>

                                            <td>{preco} <Label>CVE</Label></td>

                                            <td>{medico.nome}</td>

                                            <td>{paciente.nome}</td>

                                            <td>{servico.tipo_servico}</td>

                                            <td>

                                                <Button color="danger" onClick={() => this.removeConsulta(id)}>

                                                    Remover

                                                </Button>

                                                <Link to={`/app/edit-consulta/${id}`}>

                                                    <Button color="primary">Editar</Button>

                                                </Link>

                                            </td>

                                        </tr>

                                    )

                                )}
                        </tbody>
                    </Table>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {

        consultas: state.consultas,

    };

};

export default connect(mapStateToProps, { retrieveConsultas, deleteConsulta })(ConsultaList);