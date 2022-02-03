import {

    CREATE_HARDWARE,

    RETRIEVE_HARDWARES,

    UPDATE_HARDWARE,

    DELETE_HARDWARE,

} from "./actionTypes";

import HardwaresService from "./HardwaresService";

export const createHardware =
    (
        marca,
        preco,
        tipo_hardware,
        data_aquisicao,
        quantidade,
        nome,
        
    ) => async (dispatch) => {

        try {

            const res = await HardwaresService.create({

                marca,
                preco,
                tipo_hardware,
                data_aquisicao,
                quantidade,
                nome,

            });

            dispatch({

                type: CREATE_HARDWARE,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrieveHardwares = () => async (dispatch) => {

    try {

        const res = await HardwaresService.getAll();

        dispatch({

            type: RETRIEVE_HARDWARES,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updateHardware = (id, data) => async (dispatch) => {

    try {

        const res = await HardwaresService.update(id, data);

        dispatch({

            type: UPDATE_HARDWARE,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deleteHardware = (id) => async (dispatch) => {

    try {

        await HardwaresService.delete(id);

        dispatch({

            type: DELETE_HARDWARE,

            payload: {
                id
            },

        });

    } catch (err) {

        console.log(err);

    }
};