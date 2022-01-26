import {

    CREATE_ESPECIALIDADE,

    RETRIEVE_ESPECIALIDADES,

    UPDATE_ESPECIALIDADE,

    DELETE_ESPECIALIDADE,

} from "./actionTypes";

const initialState = [];

function especialidadeReducer(especialidades = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case CREATE_ESPECIALIDADE:

            return [...especialidades, payload];

        case RETRIEVE_ESPECIALIDADES:

            return payload;

        case UPDATE_ESPECIALIDADE:

            return especialidades.map((especialidade) => {

                if (especialidade.id === payload.id) {

                    return {

                        ...especialidade,

                        ...payload,

                    };

                } else {

                    return especialidade;

                }

            });

        case DELETE_ESPECIALIDADE:

            return especialidades.filter(({ id }) => id !== payload.id);

        default:

            return especialidades;

    }

}

export default especialidadeReducer;