import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice";
import searchReducer from "../features/search/searchSlice";
import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        search: searchReducer,
        tasks: tasksReducer,
    },
});