import {

    CREATE_AGENCIA,

    RETRIEVE_AGENCIAS,

    UPDATE_AGENCIA,

    DELETE_AGENCIA,

} from "./actionTypes";

import AgenciasService from "./AgenciasService";

export const createAgencia =
    (
        localidade,
        ilha,
        nome_gerente,
        departamentos,

    ) => async (dispatch) => {

        try {

            const res = await AgenciasService.create({

                localidade,
                ilha,
                nome_gerente,
                departamentos,

            });

            dispatch({

                type: CREATE_AGENCIA,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrieveAgencias = () => async (dispatch) => {

    try {

        const res = await AgenciasService.getAll();

        dispatch({

            type: RETRIEVE_AGENCIAS,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updateAgencia = (id, data) => async (dispatch) => {

    try {

        const res = await AgenciasService.update(id, data);

        dispatch({

            type: UPDATE_AGENCIA,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deleteAgencia = (id) => async (dispatch) => {

    try {

        await AgenciasService.delete(id);

        dispatch({

            type: DELETE_AGENCIA,

            payload: {
                id
            },

        });

    } catch (err) {

        console.log(err);

    }
};