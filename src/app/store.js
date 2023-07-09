import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice";
import searchReducer from "../features/search/searchSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    filters: filtersReducer,
    search: searchReducer,
    tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);
