import {

    CREATE_DEPARTAMENTO,

    RETRIEVE_DEPARTAMENTOS,

    UPDATE_DEPARTAMENTO,

    DELETE_DEPARTAMENTO,

} from "./actionTypes";

const initialState = [];

function departamentoReducer(departamentos = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case CREATE_DEPARTAMENTO:

            return [...departamentos, payload];

        case RETRIEVE_DEPARTAMENTOS:

            return payload;

        case UPDATE_DEPARTAMENTO:

            return departamentos.map((departamento) => {

                if (departamento.id === payload.id) {

                    return {

                        ...departamento,

                        ...payload,

                    };

                } else {

                    return departamento;

                }

            });

        case DELETE_DEPARTAMENTO:

            return departamentos.filter(({ id }) => id !== payload.id);

        default:

            return departamentos;

    }

}

export default departamentoReducer;