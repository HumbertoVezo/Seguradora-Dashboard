import {

    CREATE_DEPARTAMENTO,

    RETRIEVE_DEPARTAMENTOS,

    UPDATE_DEPARTAMENTO,

    DELETE_DEPARTAMENTO,

} from "./actionTypes";

import DepartamentosService from "./DepartamentosService";

export const createDepartamento =
    (
        nome_departamento,
        had_wares,


    ) => async (dispatch) => {

        try {

            const res = await DepartamentosService.create({

                nome_departamento,
                had_wares,

            });

            dispatch({

                type: CREATE_DEPARTAMENTO,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrieveDepartamentos = () => async (dispatch) => {

    try {

        const res = await DepartamentosService.getAll();

        dispatch({

            type: RETRIEVE_DEPARTAMENTOS,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updateDepartamento = (id, data) => async (dispatch) => {

    try {

        const res = await DepartamentosService.update(id, data);

        dispatch({

            type: UPDATE_DEPARTAMENTO,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deleteDepartamento = (id) => async (dispatch) => {

    try {

        await DepartamentosService.delete(id);

        dispatch({

            type: DELETE_DEPARTAMENTO,

            payload: {
                id
            },

        });

    } catch (err) {

        console.log(err);

    }
};