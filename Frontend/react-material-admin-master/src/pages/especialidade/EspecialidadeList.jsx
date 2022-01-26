import React, { Component } from 'react'
import { Button, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveEspecialidades, deleteEspecialidade } from "../../connections/especialidades/actions";

class EspecialidadeList extends Component {
    componentDidMount() {

        this.props.retrieveEspecialidades();

    }

    removeEspecialidade = (id) => {

        this.props.deleteEspecialidade(id).then(() => {

            this.props.retrieveEspecialidades();

        });

    };

    render() {
        const { especialidades } = this.props;

        return (
            <div>
                <h1 style={{ padding: "1em" }}>Lista de Especialidades</h1>
                <div style={{ textAlign: 'left' }}>
                    <Link to="/app/add-especialidade">

                        <Button color='primary'>Adicionar</Button>

                    </Link>
                </div>
                <br />
                <Row>
                    <Table>
                        <thead>

                            <tr>

                                <th>#</th>

                                <th>Especialidade</th>

                                <th>Ações</th>

                            </tr>

                        </thead>

                        <tbody>

                            {especialidades &&

                                especialidades.map(

                                    ({ id, tipo, }, i) => (

                                        <tr key={i}>

                                            <td>{id}</td>

                                            <td>{tipo}</td>

                                            <td>

                                                <Button color="danger" onClick={() => this.removeEspecialidade(id)}>

                                                    Remover

                                                </Button>

                                                <Link to={`/app/edit-especialidade/${id}`}>

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

        especialidades: state.especialidades,

    };

};

export default connect(mapStateToProps, { retrieveEspecialidades, deleteEspecialidade })(EspecialidadeList);