import { configureStore } from "@reduxjs/toolkit";

import consultaReducer from "./connections/consultas/reducers";

export default configureStore({

  reducer: {

    consultas: consultaReducer,

  },

});