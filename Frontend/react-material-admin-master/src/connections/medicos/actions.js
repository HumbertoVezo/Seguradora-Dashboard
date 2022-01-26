import {

    CREATE_MEDICO,

    RETRIEVE_MEDICOS,

    UPDATE_MEDICO,

    DELETE_MEDICO,

} from "./actionTypes";

import MedicosService from "./MedicosService";

export const createMedico =
    (
        nome, 
        cod_doc, 
        telemovel, 
        morada,  
        data_nasc, 
        sexo,
        especialidade, 
        doc,
    ) => async (dispatch) => {

        try {

            const res = await MedicosService.create({

                nome,
                cod_doc,
                telemovel,
                morada,
                data_nasc,
                sexo,
                especialidade,
                doc,

            });

            dispatch({

                type: CREATE_MEDICO,

                payload: res.data,

            });

            return Promise.resolve(res.data);

        } catch (err) {

            return Promise.reject(err);

        }

    };

export const retrieveMedicos = () => async (dispatch) => {

    try {

        const res = await MedicosService.getAll();

        dispatch({

            type: RETRIEVE_MEDICOS,

            payload: res.data,

        });

    } catch (err) {

        console.log(err);

    }

};

export const updateMedico = (id, data) => async (dispatch) => {

    try {

        const res = await MedicosService.update(id, data);

        dispatch({

            type: UPDATE_MEDICO,

            payload: data,

        });

        return Promise.resolve(res.data);

    } catch (err) {

        return Promise.reject(err);

    }

};

export const deleteMedico = (id) => async (dispatch) => {

    try {

        await MedicosService.delete(id);

        dispatch({

            type: DELETE_MEDICO,

            payload: { id },

        });

    } catch (err) {

        console.log(err);

    }
};