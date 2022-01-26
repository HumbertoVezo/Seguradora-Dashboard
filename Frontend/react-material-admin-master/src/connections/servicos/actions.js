import {

    CREATE_SERVICO,

    RETRIEVE_SERVICOS,

    UPDATE_SERVICO,

    DELETE_SERVICO,

} from "./actionTypes";

import ServicosService from "./ServicosService";

export const createServico =
    (
        tipo_servico
    ) => async (dispatch) => {

        try {

            const res = await ServicosService.create({

                tipo_servico
            });

            dispatch({

                type: CREATE_SERVICO,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrieveServicos = () => async (dispatch) => {

    try {

        const res = await ServicosService.getAll();

        dispatch({

            type: RETRIEVE_SERVICOS,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updateServico = (id, data) => async (dispatch) => {

    try {

        const res = await ServicosService.update(id, data);

        dispatch({

            type: UPDATE_SERVICO,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deleteServico = (id) => async (dispatch) => {

    try {

        await ServicosService.delete(id);

        dispatch({

            type: DELETE_SERVICO,

            payload: { id },

        });

    } catch (err) {

        console.log(err);

    }
};