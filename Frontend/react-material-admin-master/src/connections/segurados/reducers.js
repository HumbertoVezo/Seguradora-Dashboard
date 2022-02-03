import {

    CREATE_SEGURADO,

    RETRIEVE_SEGURADOS,

    UPDATE_SEGURADO,

    DELETE_SEGURADO,

} from "./actionTypes";

const initialState = [];

function seguradoReducer(segurados = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case CREATE_SEGURADO:

            return [...segurados, payload];

        case RETRIEVE_SEGURADOS:

            return payload;

        case UPDATE_SEGURADO:

            return segurados.map((segurado) => {

                if (segurado.id === payload.id) {

                    return {

                        ...segurado,

                        ...payload,

                    };

                } else {

                    return segurado;

                }

            });

        case DELETE_SEGURADO:

            return segurados.filter(({ id }) => id !== payload.id);

        default:

            return segurados;

    }

}

export default seguradoReducer;