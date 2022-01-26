import React, { Component } from 'react'
import { Button, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveServicos, deleteServico } from "../../connections/servicos/actions";

class ServicoList extends Component {
    componentDidMount() {

        this.props.retrieveServicos();

    }

    removeServico = (id) => {

        this.props.deleteServico(id).then(() => {

            this.props.retrieveServicos();

        });

    };

    render() {
        const { servicos } = this.props;

        return (
            <div>
                <h1 style={{ padding: "1em" }}>Lista de Servicos</h1>
                <div style={{ textAlign: 'left' }}>
                    <Link to="/app/add-servico">

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

                                <th>Ações</th>

                            </tr>

                        </thead>

                        <tbody>

                            {servicos &&

                                servicos.map(

                                    ({ id, tipo_servico, }, i) => (

                                        <tr key={i}>

                                            <td>{id}</td>

                                            <td>{tipo_servico}</td>

                                            <td>

                                                <Button color='danger' onClick={() => this.removeServico(id)}>

                                                    Remover

                                                </Button>

                                                <Link to={`/app/edit-servico/${id}`}>

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

        servicos: state.servicos,

    };

};

export default connect(mapStateToProps, { retrieveServicos, deleteServico })(ServicoList);