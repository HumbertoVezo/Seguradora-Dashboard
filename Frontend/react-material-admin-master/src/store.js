import { configureStore } from "@reduxjs/toolkit";

import consultaReducer from "./connections/consultas/reducers";
import seguroReducer from "./connections/seguros/reducers";
import seguradoReducer from "./connections/segurados/reducers";
import hadwareReducer from "./connections/hadwares/reducers";
import departamentoReducer from "./connections/departamentos/reducers";
import agenciaReducer from "./connections/agencias/reducers";

export default configureStore({

  reducer: {

    consultas: consultaReducer,
    seguros: seguroReducer,
    segurados: seguradoReducer,
    had_wares: hadwareReducer,
    departamentos: departamentoReducer,
    agencias: agenciaReducer,

  },

});