import {

    CREATE_HARDWARE,

    RETRIEVE_HARDWARES,

    UPDATE_HARDWARE,

    DELETE_HARDWARE,

} from "./actionTypes";

const initialState = [];

function hardwareReducer(hardwares = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case CREATE_HARDWARE:

            return [...hardwares, payload];

        case RETRIEVE_HARDWARES:

            return payload;

        case UPDATE_HARDWARE:

            return hardwares.map((hardware) => {

                if (hardware.id === payload.id) {

                    return {

                        ...hardware,

                        ...payload,

                    };

                } else {

                    return hardware;

                }

            });

        case DELETE_HARDWARE:

            return hardwares.filter(({ id }) => id !== payload.id);

        default:

            return hardwares;

    }

}

export default hardwareReducer;