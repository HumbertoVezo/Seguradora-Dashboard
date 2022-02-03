import { configureStore } from "@reduxjs/toolkit";

import consultaReducer from "./connections/consultas/reducers";
import seguroReducer from "./connections/seguros/reducers";
import seguradoReducer from "./connections/segurados/reducers";

export default configureStore({

  reducer: {

    consultas: consultaReducer,
    seguros: seguroReducer,
    segurados: seguradoReducer,



  },

});