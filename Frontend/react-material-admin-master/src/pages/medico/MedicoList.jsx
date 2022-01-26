import React, { Component } from 'react'
import { Button, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveMedicos, deleteMedico } from "../../connections/medicos/actions";


class MedicoList extends Component {
    componentDidMount() {

        this.props.retrieveMedicos();

    }

    removeMedico = (id) => {

        this.props.deleteMedico(id).then(() => {

            this.props.retrieveMedicos();

        });

    };

    render() {
        const { medicos } = this.props;

        return (
            <div>
                <h1 style={{ padding: "1em" }}>Lista de Medicos</h1>
                <div style={{ textAlign: 'left' }}>
                    <Link to="/app/add-medico">

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

                                <th>Telemovel</th>

                                <th>Especialidade</th>

                                <th>Sexo</th>

                                <th>Ações</th>

                            </tr>

                        </thead>

                        <tbody>

                            {medicos &&

                                medicos.map(

                                    ({ id, nome, cod_doc, morada, telemovel, especialidade, sexo }, i) => (

                                        <tr key={i}>

                                            <td>{id}</td>

                                            <td>{nome}</td>

                                            <td>{cod_doc}</td>

                                            <td>{morada}</td>

                                            <td>{telemovel}</td>

                                            <td>{especialidade.tipo}</td>

                                            <td>{sexo.tipo_sexo}</td>

                                            <td>

                                                <Button color='danger' onClick={() => this.removeMedico(id)}>

                                                    Remover

                                                </Button>

                                                <Link to={`/app/edit-medico/${id}`}>

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

        medicos: state.medicos,

    };

};

export default connect(mapStateToProps, { retrieveMedicos, deleteMedico })(MedicoList);