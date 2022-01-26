import React, { Component } from 'react'
import { Button, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrievePacientes, deletePaciente } from "../../connections/pacientes/actions";

class PacienteList extends Component {
    componentDidMount() {

        this.props.retrievePacientes();

    }

    removePaciente = (id) => {

        this.props.deletePaciente(id).then(() => {

            this.props.retrievePacientes();

        });

    };

    render() {
        const { pacientes } = this.props;

        return (
            <div>
                <h1 style={{ padding: "1em" }}>Lista de Pacientes</h1>
                <div style={{ textAlign: 'left' }}>
                    <Link to="/app/add-paciente">

                        <Button color='primary'>Adicionar</Button>

                    </Link>
                </div>
                <br />
                <Row>
                    <Table>
                        <thead>

                            <tr>

                                <th>#</th>

                                <th>Nome</th>

                                <th>Identificação</th>

                                <th>Morada</th>

                                <th>Telefone</th>

                                <th>Data Nascimento</th>

                                <th>Sexo</th>

                                <th>Ações</th>

                            </tr>

                        </thead>

                        <tbody>

                            {pacientes &&

                                pacientes.map(

                                    ({ id, nome, cod_doc, morada, telefone, data_nasc, sexo }, i) => (

                                        <tr key={i}>

                                            <td>{id}</td>

                                            <td>{nome}</td>

                                            <td>{cod_doc}</td>

                                            <td>{morada}</td>

                                            <td>{telefone}</td>

                                            <td>{data_nasc}</td>

                                            <td>{sexo.tipo_sexo}</td>

                                            <td>

                                                <Button color='danger' onClick={() => this.removePaciente(id)}>

                                                    Remover

                                                </Button>

                                                <Link to={`/app/edit-paciente/${id}`}>

                                                    <Button color='primary'>Editar</Button>

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

        pacientes: state.pacientes,

    };

};

export default connect(mapStateToProps, { retrievePacientes, deletePaciente })(PacienteList);