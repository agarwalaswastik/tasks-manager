import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        search: searchReducer,
    },
});