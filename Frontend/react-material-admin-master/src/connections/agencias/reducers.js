import {

    CREATE_AGENCIA,

    RETRIEVE_AGENCIAS,

    UPDATE_AGENCIA,

    DELETE_AGENCIA,

} from "./actionTypes";

const initialState = [];

function agenciaReducer(agencias = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case CREATE_AGENCIA:

            return [...agencias, payload];

        case RETRIEVE_AGENCIAS:

            return payload;

        case UPDATE_AGENCIA:

            return agencias.map((agencia) => {

                if (agencia.id === payload.id) {

                    return {

                        ...agencia,

                        ...payload,

                    };

                } else {

                    return agencia;

                }

            });

        case DELETE_AGENCIA:

            return agencias.filter(({ id }) => id !== payload.id);

        default:

            return agencias;

    }

}

export default agenciaReducer;