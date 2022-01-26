import {

    CREATE_CONSULTA,

    RETRIEVE_CONSULTAS,

    UPDATE_CONSULTA,

    DELETE_CONSULTA,

} from "./actionTypes";

const initialState = [];

function consultaReducer(consultas = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case CREATE_CONSULTA:

            return [...consultas, payload];

        case RETRIEVE_CONSULTAS:

            return payload;

        case UPDATE_CONSULTA:

            return consultas.map((consulta) => {

                if (consulta.id === payload.id) {

                    return {

                        ...consulta,

                        ...payload,

                    };

                } else {

                    return consulta;

                }

            });

        case DELETE_CONSULTA:

            return consultas.filter(({ id }) => id !== payload.id);

        default:

            return consultas;

    }

}

export default consultaReducer;