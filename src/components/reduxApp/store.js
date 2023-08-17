import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employeeSlice";

export default configureStore({
    reducer: {
        employee: employeeReducer,
    },
});