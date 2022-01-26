import {

    CREATE_PACIENTE,

    RETRIEVE_PACIENTES,

    UPDATE_PACIENTE,

    DELETE_PACIENTE,

} from "./actionTypes";

import PacientesService from "./PacientesService";

export const createPaciente =
    (
        nome,
        cod_doc,
        morada,
        telefone,
        data_nasc,
        sexo,
        doc,
    ) => async (dispatch) => {

        try {

            const res = await PacientesService.create({

                nome,
                cod_doc,
                morada,
                telefone,
                data_nasc,
                sexo,
                doc,

            });

            dispatch({

                type: CREATE_PACIENTE,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrievePacientes = () => async (dispatch) => {

    try {

        const res = await PacientesService.getAll();

        dispatch({

            type: RETRIEVE_PACIENTES,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updatePaciente = (id, data) => async (dispatch) => {

    try {

        const res = await PacientesService.update(id, data);

        dispatch({

            type: UPDATE_PACIENTE,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deletePaciente = (id) => async (dispatch) => {

    try {

        await PacientesService.delete(id);

        dispatch({

            type: DELETE_PACIENTE,

            payload: { id },

        });

    } catch (err) {

        console.log(err);

    }
};