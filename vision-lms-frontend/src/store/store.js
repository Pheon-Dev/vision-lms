import {configureStore} from "@reduxjs/toolkit";

import {mpesaApi} from "../services/MpesaApi";

export default configureStore({
  reducer: {
    [mpesaApi.reducerPath]: mpesaApi.reduceer,
  },
});
