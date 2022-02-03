import {

    CREATE_SEGURO,

    RETRIEVE_SEGUROS,

    UPDATE_SEGURO,

    DELETE_SEGURO,

} from "./actionTypes";

import SegurosService from "./SegurosService";

export const createSeguro =
    (
        data_inicio,
        data_renovacao,
        segurado,
        modalidade,
        valor_seguro,
        estados,
        veiculos,

    ) => async (dispatch) => {

        try {

            const res = await SegurosService.create({

                data_inicio,
                data_renovacao,
                segurado,
                modalidade,
                valor_seguro,
                estados,
                veiculos,

            });

            dispatch({

                type: CREATE_SEGURO,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrieveSeguros = () => async (dispatch) => {

    try {

        const res = await SegurosService.getAll();

        dispatch({

            type: RETRIEVE_SEGUROS,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updateSeguro = (id, data) => async (dispatch) => {

    try {

        const res = await SegurosService.update(id, data);

        dispatch({

            type: UPDATE_SEGURO,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deleteSeguro = (id) => async (dispatch) => {

    try {

        await SegurosService.delete(id);

        dispatch({

            type: DELETE_SEGURO,

            payload: {
                id
            },

        });

    } catch (err) {

        console.log(err);

    }
};