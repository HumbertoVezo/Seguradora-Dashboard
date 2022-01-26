import {

    CREATE_MEDICO,

    RETRIEVE_MEDICOS,

    UPDATE_MEDICO,

    DELETE_MEDICO,

} from "./actionTypes";

const initialState = [];

function medicoReducer(medicos = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case CREATE_MEDICO:

            return [...medicos, payload];

        case RETRIEVE_MEDICOS:

            return payload;

        case UPDATE_MEDICO:

            return medicos.map((medico) => {

                if (medico.id === payload.id) {

                    return {

                        ...medico,

                        ...payload,

                    };

                } else {

                    return medico;

                }

            });

        case DELETE_MEDICO:

            return medicos.filter(({ id }) => id !== payload.id);

        default:

            return medicos;

    }

}

export default medicoReducer;