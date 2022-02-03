import {

    CREATE_SEGURO,

    RETRIEVE_SEGUROS,

    UPDATE_SEGURO,

    DELETE_SEGURO,

} from "./actionTypes";

const initialState = [];

function seguroReducer(seguros = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case CREATE_SEGURO:

            return [...seguros, payload];

        case RETRIEVE_SEGUROS:

            return payload;

        case UPDATE_SEGURO:

            return seguros.map((seguro) => {

                if (seguro.id === payload.id) {

                    return {

                        ...seguro,

                        ...payload,

                    };

                } else {

                    return seguro;

                }

            });

        case DELETE_SEGURO:

            return seguros.filter(({ id }) => id !== payload.id);

        default:

            return seguros;

    }

}

export default seguroReducer;