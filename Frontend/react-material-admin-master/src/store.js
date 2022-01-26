import { configureStore } from "@reduxjs/toolkit";

import medicoReducer from "./connections/medicos/reducers";
import pacienteReducer from "./connections/pacientes/reducers";
import servicoReducer from "./connections/servicos/reducers";
import consultaReducer from "./connections/consultas/reducers";
import especialidadeReducer from "./connections/especialidades/reducers";

export default configureStore({

  reducer: {

    medicos: medicoReducer,
    pacientes: pacienteReducer,
    servicos: servicoReducer,
    consultas: consultaReducer,
    especialidades: especialidadeReducer,

  },

});