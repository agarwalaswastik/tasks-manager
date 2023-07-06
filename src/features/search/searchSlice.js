import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchFilterIds: [],
        searchQuery: "",
    },
    reducers: {
        addSearchFilter: (state, action) => {
            for (let searchFilterId of state.searchFilterIds) {
                if (searchFilterId === action.payload) {
                    return;
                }
            }
            state.searchFilterIds.push(action.payload);
        },
        removeSearchFilter: (state, action) => {
            for (let i = 0; i < state.searchFilterIds.length; i++) {
                if (state.searchFilterIds[i] === action.payload) {
                    state.searchFilterIds.splice(i, 1);
                    return;
                }
            }
        },
        applySearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { addSearchFilter, removeSearchFilter, applySearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
