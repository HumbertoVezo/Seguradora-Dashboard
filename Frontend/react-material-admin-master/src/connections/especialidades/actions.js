import {

    CREATE_ESPECIALIDADE,

    RETRIEVE_ESPECIALIDADES,

    UPDATE_ESPECIALIDADE,

    DELETE_ESPECIALIDADE,

} from "./actionTypes";

import EspecialidadesService from "./EspecialidadesService";

export const createEspecialidade =
    (
        tipo
    ) => async (dispatch) => {

        try {

            const res = await EspecialidadesService.create({

                tipo
            });

            dispatch({

                type: CREATE_ESPECIALIDADE,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrieveEspecialidades = () => async (dispatch) => {

    try {

        const res = await EspecialidadesService.getAll();

        dispatch({

            type: RETRIEVE_ESPECIALIDADES,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updateEspecialidade = (id, data) => async (dispatch) => {

    try {

        const res = await EspecialidadesService.update(id, data);

        dispatch({

            type: UPDATE_ESPECIALIDADE,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deleteEspecialidade = (id) => async (dispatch) => {

    try {

        await EspecialidadesService.delete(id);

        dispatch({

            type: DELETE_ESPECIALIDADE,

            payload: { id },

        });

    } catch (err) {

        console.log(err);

    }
};