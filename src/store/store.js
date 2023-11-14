import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";

export default configureStore({ reducer: { languageSlice } });
