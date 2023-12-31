import { createSelector, createSlice } from "@reduxjs/toolkit";
import { generateUniqueId } from "../../utils/idUtils";
import { generateNextColor } from "../../utils/colorUtils";

export const filtersSlice = createSlice({
    name: "filters",
    initialState: [],
    reducers: {
        addFilter: {
            prepare: (id, desc, color) => ({
                payload: { id, desc, color },
            }),
            reducer: (state, action) => {
                state.unshift(action.payload);
            },
        },
        deleteFilter: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload) {
                    state.splice(i, 1);
                    return;
                }
            }
        },
    },
});

export const filterSelector = createSelector(
    (state) => state.filters,
    (_, filterId) => filterId,
    (filters, filterId) => filters.find((filter) => filter.id === filterId)
);

export const addFilter = (desc) =>
    filtersSlice.actions.addFilter(generateUniqueId(), desc, generateNextColor());

export const { deleteFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
