import {

    CREATE_CONSULTA,

    RETRIEVE_CONSULTAS,

    UPDATE_CONSULTA,

    DELETE_CONSULTA,

} from "./actionTypes";

import ConsultasService from "./ConsultasService";

export const createConsulta =
    (
        sintoma,
        data,
        preco,
        medico,
        paciente,
        servico,
    ) => async (dispatch) => {

        try {

            const res = await ConsultasService.create({

                sintoma,
                data,
                preco,
                medico,
                paciente,
                servico,

            });

            dispatch({

                type: CREATE_CONSULTA,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrieveConsultas = () => async (dispatch) => {

    try {

        const res = await ConsultasService.getAll();

        dispatch({

            type: RETRIEVE_CONSULTAS,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updateConsulta = (id, data) => async (dispatch) => {

    try {

        const res = await ConsultasService.update(id, data);

        dispatch({

            type: UPDATE_CONSULTA,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deleteConsulta = (id) => async (dispatch) => {

    try {

        await ConsultasService.delete(id);

        dispatch({

            type: DELETE_CONSULTA,

            payload: {
                id
            },

        });

    } catch (err) {

        console.log(err);

    }
};