import { createSlice } from "@reduxjs/toolkit";
export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        value: [],
    },
    reducers: {
        addEmployee: (state, action) => {
            console.log("AddEmployee Action");
            state.value.unshift(...action.payload);
        },
        addAllEmployee: (state, action) => {
            console.log("AddEmployee Action");
            state.value.push(...action.payload)
        },
    },
});
export const { addEmployee, addAllEmployee } = employeeSlice.actions;
export const selectEmployee = (state) => state.employee.value;
export default employeeSlice.reducer;
