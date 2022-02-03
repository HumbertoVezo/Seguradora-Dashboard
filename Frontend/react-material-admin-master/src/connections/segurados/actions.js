import {

    CREATE_SEGURADO,

    RETRIEVE_SEGURADOS,

    UPDATE_SEGURADO,

    DELETE_SEGURADO,

} from "./actionTypes";

import SeguradosService from "./SeguradosService";

export const createSegurado =
    (

        cod_doc,
        nome,
        data_carteira,
        conselho,
        localidade,
        sexo,
        restricao,
        categoria_cartas,

    ) => async (dispatch) => {

        try {

            const res = await SeguradosService.create({

                cod_doc,
                nome,
                data_carteira,
                conselho,
                localidade,
                sexo,
                restricao,
                categoria_cartas,

            });

            dispatch({

                type: CREATE_SEGURADO,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrieveSegurados = () => async (dispatch) => {

    try {

        const res = await SeguradosService.getAll();

        dispatch({

            type: RETRIEVE_SEGURADOS,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updateSegurado = (id, data) => async (dispatch) => {

    try {

        const res = await SeguradosService.update(id, data);

        dispatch({

            type: UPDATE_SEGURADO,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deleteSegurado = (id) => async (dispatch) => {

    try {

        await SeguradosService.delete(id);

        dispatch({

            type: DELETE_SEGURADO,

            payload: {
                id
            },

        });

    } catch (err) {

        console.log(err);

    }
};